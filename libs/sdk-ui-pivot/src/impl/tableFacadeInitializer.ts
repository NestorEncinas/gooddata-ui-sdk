// (C) 2007-2021 GoodData Corporation
import { TableConfig } from "./privateTypes";
import {
    IDataView,
    IExecutionResult,
    IPreparedExecution,
    isNoDataError,
    isUnexpectedResponseError,
} from "@gooddata/sdk-backend-spi";
import { COLS_PER_PAGE } from "./base/constants";
import {
    getAvailableDrillTargets,
    getAvailableDrillTargetsFromExecutionResult,
} from "./drilling/drillTargets";
import { convertError, DataViewFacade } from "@gooddata/sdk-ui";
import { ICorePivotTableProps } from "../publicTypes";
import invariant from "ts-invariant";
import { TableFacade } from "./tableFacade";

export class TableFacadeInitializer {
    private abandoned: boolean = false;

    constructor(
        private readonly execution: IPreparedExecution,
        private readonly config: TableConfig,
        private readonly props: Readonly<ICorePivotTableProps>,
    ) {}

    /**
     * Abandon the initialization. This will not cancel any requests that may be already in-flight. It will
     * ensure though that no events will be emitted and that the initalization ends with `undefined` result.
     */
    public abandon = (): void => {
        invariant(!this.abandoned);

        this.abandoned = true;
    };

    /**
     * Drives initialization of the table facade. The initialization will emit all the essential
     * loading, error, onExportReady and pushData events using the callback functions specified in the {@link TableConfig}.
     */
    public initialize = (): Promise<TableFacade | undefined> => {
        const { execution, config } = this;

        config.onLoadingChanged({ isLoading: true });

        return execution
            .execute()
            .then((result) => {
                return result
                    .readWindow([0, 0], [this.props.pageSize!, COLS_PER_PAGE])
                    .then((dataView) => {
                        if (this.abandoned) {
                            /*
                             * Stop right now if the component gets unmounted while it is still being
                             * initialized.
                             */
                            return undefined;
                        }

                        const table: TableFacade = this.createTableFacade(result, dataView);

                        config.onLoadingChanged({ isLoading: false });
                        config.onExportReady(table.createExportFunction(this.props.exportTitle));

                        const availableDrillTargets = table.getAvailableDrillTargets();
                        config.pushData({ dataView, availableDrillTargets });

                        return table;
                    })
                    .catch((error) => {
                        if (this.abandoned) {
                            return undefined;
                        }

                        /**
                         * When execution result is received successfully,
                         * but data load fails with unexpected http response,
                         * we still want to push availableDrillTargets
                         */
                        if (isUnexpectedResponseError(error)) {
                            const availableDrillTargets = getAvailableDrillTargetsFromExecutionResult(result);

                            this.props.pushData!({ availableDrillTargets });
                        }

                        /*
                         * There can be situations, where there is no data to visualize but the result / dataView contains
                         * metadata essential for setup of drilling. Look for that and if available push up.
                         */
                        if (isNoDataError(error) && error.dataView) {
                            const availableDrillTargets = getAvailableDrillTargets(
                                DataViewFacade.for(error.dataView),
                            );

                            config.pushData({ availableDrillTargets });
                            config.onLoadingChanged({ isLoading: false });
                        }

                        config.onError(convertError(error), this.execution);
                    });
            })
            .catch((error) => {
                if (this.abandoned) {
                    return undefined;
                }

                config.onError(convertError(error), this.execution);
            });
    };

    private createTableFacade = (result: IExecutionResult, dataView: IDataView): TableFacade => {
        return new TableFacade(result, dataView, this.config, this.props);
    };
}