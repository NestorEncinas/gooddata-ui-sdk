// (C) 2021 GoodData Corporation

import { Identifier, idRef } from "@gooddata/sdk-model";
import { createDashboardStore, ReduxedDashboardStore } from "../state/dashboardStore";
import { DashboardContext } from "../types/commonTypes";
import { recordedBackend } from "@gooddata/sdk-backend-mockingbird";
import { ReferenceRecordings } from "@gooddata/reference-workspace";
import { DashboardEvents, DashboardEventType } from "../events";
import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import noop from "lodash/noop";
import { DashboardCommandType } from "../commands";

export const SimpleDashboardRecording = "aaRaEZRWdRpQ";

type MonitoredAction = {
    calls: number;
    promise: Promise<PayloadAction<any>>;
    resolve: (action: PayloadAction<any>) => void;
    reject: (e: any) => void;
};

export class DashboardTester {
    protected readonly reduxedStore: ReduxedDashboardStore;
    private monitoredActions: Record<string, MonitoredAction> = {};
    private capturedActions: Array<PayloadAction<any>> = [];

    protected constructor(ctx: DashboardContext) {
        // Middleware to store the actions and create promises
        const testerMiddleware: Middleware = () => (next) => (action) => {
            if (action.type.startsWith("@@redux/")) {
                //
            } else {
                this.onActionCaptured(action);
            }

            return next(action);
        };

        this.reduxedStore = createDashboardStore({
            sagaContext: ctx,
            additionalMiddleware: testerMiddleware,
            initialEventHandlers: [
                {
                    eval: () => true,
                    handler: this.eventHandler,
                },
            ],
        });
    }

    private getOrCreateMonitoredAction = (actionType: string): MonitoredAction => {
        const existingAction: MonitoredAction = this.monitoredActions[actionType];

        if (existingAction) {
            return existingAction;
        }

        const partialAction = {
            calls: 0,
            resolve: noop,
            reject: noop,
        };

        const promise = new Promise<PayloadAction<any>>((resolve, reject) => {
            partialAction.resolve = resolve;
            partialAction.reject = reject;
        });

        const newAction: MonitoredAction = {
            ...partialAction,
            promise,
        };

        this.monitoredActions[actionType] = newAction;

        return newAction;
    };

    private onActionCaptured = (action: PayloadAction<any>): void => {
        this.capturedActions.push(action);

        const monitoredAction = this.getOrCreateMonitoredAction(action.type);
        monitoredAction.calls += 1;
        monitoredAction.resolve(action);
    };

    private eventHandler = (evt: DashboardEvents): void => {
        // eslint-disable-next-line no-console
        console.log("handle event", evt.type);
    };

    public static forRecording(identifier: Identifier): DashboardTester {
        const ctx: DashboardContext = {
            backend: recordedBackend(ReferenceRecordings.Recordings),
            workspace: "reference-workspace",
            dashboardRef: idRef(identifier),
        };

        return new DashboardTester(ctx);
    }

    public dispatch(action: PayloadAction<any>): void {
        this.reduxedStore.store.dispatch(action);
    }

    /**
     * Wait for action to occur. The wait is bounded by a timeout that is 1s by default.
     *
     * @param actionType - action type to wait for
     * @param timeout - timeout after which the wait fails, default is 1000
     */
    public waitFor(
        actionType: DashboardEventType | DashboardCommandType | string,
        timeout: number = 1000,
    ): Promise<any> {
        return Promise.race([
            this.getOrCreateMonitoredAction(actionType).promise,
            new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error(`Wait for action '${actionType}' timed out after ${timeout}ms`));
                }, timeout);
            }),
        ]);
    }

    public resetMonitors(): void {
        this.capturedActions = [];
        this.monitoredActions = {};
    }
}
