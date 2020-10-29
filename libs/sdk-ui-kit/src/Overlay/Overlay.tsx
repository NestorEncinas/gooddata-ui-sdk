// (C) 2007-2020 GoodData Corporation
import React from "react";
import cx from "classnames";
import { Portal } from "react-portal";
import bindAll from "lodash/bindAll";
import pick from "lodash/pick";
import isEqual from "lodash/isEqual";
import findIndex from "lodash/findIndex";
import debounce from "lodash/debounce";
import "element-closest-polyfill";
import { propsEqual } from "@gooddata/goodstrap/lib/core/immutable";
import { DEFAULT_ALIGN_POINTS, getOptimalAlignment } from "../utils/overlay";
import { elementRegion, isFixedPosition } from "../utils/domUtilities";
import { ENUM_KEY_CODE } from "../typings/utilities";
import { IOverlayProps, IOverlayState } from "./typings";
import { Alignment } from "../typings/overlay";

const events = [
    { name: "click", handler: "closeOnOutsideClick", target: document },
    {
        name: "mousedown",
        handler: "onDocumentMouseDown",
        target: document,
        requiredProp: "closeOnOutsideClick",
    },
    { name: "goodstrap.scrolled", handler: "closeOnParentScroll" },
    { name: "goodstrap.drag", handler: "closeOnMouseDrag" },
    { name: "keydown", handler: "closeOnEscape" },
];

const eventProps = events.map((event) => event.handler);
const ALIGN_TIMEOUT_MS = 10;
const INIT_STATE_ALIGN = -500;

export const POSITION_SAME_AS_TARGET = "sameAsTarget";

function exceedsThreshold(firstNumber: number, secondNumber: number) {
    return Math.abs(firstNumber - secondNumber) > 2;
}

function alignExceedsThreshold(firstAlignment: Alignment, secondAlignment: Alignment) {
    return (
        exceedsThreshold(firstAlignment.top, secondAlignment.top) ||
        exceedsThreshold(firstAlignment.left, secondAlignment.left) ||
        exceedsThreshold(firstAlignment.right, secondAlignment.right)
    );
}

const stopPropagation = (e: React.KeyboardEvent) => {
    e.stopPropagation();
};

/**
 * @internal
 */
export class Overlay<T> extends React.Component<IOverlayProps<T>, IOverlayState> {
    private containerRef = React.createRef<HTMLElement>();
    private overlayRef = React.createRef<HTMLDivElement>();

    static defaultProps = {
        alignPoints: DEFAULT_ALIGN_POINTS,
        alignTo: "body",
        children: false,
        className: "",
        containerClassName: "",
        closeOnMouseDrag: false,
        closeOnOutsideClick: false,
        closeOnParentScroll: false,
        closeOnEscape: false,
        ignoreClicksOn: "",
        ignoreClicksOnByClass: "",
        isModal: false,
        onAlign: (): void => {},
        onClose: (): void => {},
        positionType: "absolute",
        shouldCloseOnClick: () => true,
        onClick: stopPropagation,
        onMouseOver: stopPropagation,
        onMouseUp: stopPropagation,
        zIndex: 0,
    };

    isComponentMounted: boolean;
    clickedInside: boolean;
    portalNode: HTMLDivElement;

    constructor(props: IOverlayProps<T>) {
        super(props);

        this.state = {
            alignment: {
                align: props.alignPoints[0].align,
                left: INIT_STATE_ALIGN,
                top: INIT_STATE_ALIGN,
                right: 0,
            },
        };

        this.isComponentMounted = false;
        this.clickedInside = false;

        this.align = this.align.bind(this);
        this.onMaskClick = this.onMaskClick.bind(this);

        bindAll(
            this,
            events.map((event) => event.handler),
        );

        this.createPortalNode();
    }

    public componentDidMount() {
        this.isComponentMounted = true;

        window.addEventListener("resize", this.resizeHandler);

        this.addListeners(this.props);

        setTimeout(() => {
            this.align();
        }, ALIGN_TIMEOUT_MS);
    }

    public componentWillReceiveProps(nextProps: IOverlayProps<T>): void {
        if (!isEqual(pick(this.props, eventProps), pick(nextProps, eventProps))) {
            this.removeListeners(this.props);
            this.addListeners(nextProps);
        }
    }

    public shouldComponentUpdate(nextProps: IOverlayProps<T>, nextState: IOverlayState) {
        const propsChanged = !propsEqual(this.props, nextProps);
        const positionChanged = !isEqual(this.state.alignment, nextState.alignment);

        return propsChanged || positionChanged;
    }

    public componentDidUpdate(): void {
        setTimeout(() => {
            this.align();
        }, ALIGN_TIMEOUT_MS);
    }

    public componentWillUnmount(): void {
        this.isComponentMounted = false;

        window.removeEventListener("resize", this.resizeHandler);

        this.removeListeners(this.props);

        this.removePortalNodeAfterAllTreeUnmount();
    }

    private onMaskClick(e: React.MouseEvent<HTMLDivElement>) {
        if (!this.props.closeOnOutsideClick) {
            e.stopPropagation();
        }
    }

    public getOverlayStyles(): any {
        const { alignTo, positionType, zIndex } = this.props;
        const { alignment } = this.state;

        let position = positionType;
        if (this.isSameAsTargetPosition(positionType)) {
            position = isFixedPosition(alignTo) ? "fixed" : "absolute";
        }

        return {
            position,
            left: alignment.left,
            top: alignment.top,
            zIndex,
        };
    }

    getOverlayClasses(): string {
        return cx(this.props.className, this.getAlignClasses(), {
            "overlay-wrapper": true,
        });
    }

    /**
     * Add CSS classes to overlay wrapper, so they can be used
     * for position of arrows and stuff
     */
    private getAlignClasses(): string {
        const align = this.state.alignment.align.split(" ");

        return `target-${align[0]} self-${align[1]}`;
    }

    private createPortalNode(): void {
        this.portalNode = document.createElement("div");
        document.body.appendChild(this.portalNode);
    }

    private removePortalNodeAfterAllTreeUnmount(): void {
        setTimeout(() => {
            if (this.portalNode && document.body.contains(this.portalNode)) {
                document.body.removeChild(this.portalNode);
            }
            this.portalNode = null;
        });
    }

    private isSameAsTargetPosition = (positionType: string): boolean => {
        return positionType === POSITION_SAME_AS_TARGET;
    };

    private resizeHandler = debounce(() => this.align(), 100);

    private isEventOnParent(event: any) {
        const node = this.containerRef.current;
        const eventNode = (event.detail && event.detail.node) || event.target;
        return eventNode.contains(node);
    }

    private shouldCloseOnClick(e: React.MouseEvent) {
        if (!this.isComponentMounted) {
            return false;
        }

        if (!this.isAligned()) {
            return false;
        }

        // an ignored node has been clicked, always keep the overlay open
        if (this.hasClickedOnIgnoredNode(e)) {
            return false;
        }

        // non-ignored node clicked, give shouldCloseOnClick the chance
        // to override closing the dialog
        if (!this.props.shouldCloseOnClick(e)) {
            return false;
        }

        return true;
    }

    private hasClickedOnIgnoredNode(e: any) {
        if (e.defaultPrevented) {
            // Ignore event if it should be prevented (e.q. by click in child component)
            return true;
        }

        const clickedElement = e.target;

        if (this.isElementInChildOverlay(clickedElement) || this.clickedInside) {
            return true;
        }

        const ignoredRefElements = [this.overlayRef.current, ...this.props.ignoreClicksOn];
        const clickInsideIgnoredRefElement = ignoredRefElements.some((ref: any) => {
            return ref && ref.contains(clickedElement);
        });
        if (clickInsideIgnoredRefElement) {
            return true;
        }

        const clickInsideIgnoredClassElement = this.props.ignoreClicksOnByClass.some((selector: T) =>
            clickedElement.closest(selector),
        );
        if (clickInsideIgnoredClassElement) {
            return true;
        }

        return false;
    }

    private isAligned() {
        return this.state.alignment.left !== INIT_STATE_ALIGN && this.state.alignment.top != INIT_STATE_ALIGN;
    }

    // makes assumption that overlays later in the DOM are child overlays
    private isElementInChildOverlay(element: HTMLElement) {
        const overlays = Array.from(document.querySelectorAll(".overlay-wrapper"));
        const thisOverlayIndex = findIndex(overlays, (overlay) => overlay === this.overlayRef.current);

        return overlays.slice(thisOverlayIndex + 1).some((overlay) => overlay.contains(element));
    }

    private align(): void {
        const { alignPoints, alignTo, positionType } = this.props;
        const overlay: any = this.overlayRef.current;

        if (!alignPoints || !overlay) return;

        const isSameAsTarget = this.isSameAsTargetPosition(positionType);
        const optimalAlign = getOptimalAlignment({
            targetRegion: elementRegion(alignTo, isSameAsTarget),
            selfRegion: elementRegion(overlay),
            alignPoints,
            ignoreScrollOffsets: isSameAsTarget,
        });

        if (alignExceedsThreshold(this.state.alignment, optimalAlign.alignment)) {
            this.setState(
                {
                    alignment: optimalAlign.alignment,
                },
                () => {
                    this.props.onAlign(optimalAlign.alignment);
                },
            );
        } else {
            this.props.onAlign(optimalAlign.alignment);
        }
    }

    //@ts-ignore
    private closeOnParentScroll(e: React.MouseEvent): void {
        if (!this.isComponentMounted) {
            return;
        }

        if (this.isEventOnParent(e)) {
            this.props.onClose();
        }
    }

    //@ts-ignore
    private closeOnMouseDrag(): void {
        if (!this.isComponentMounted) {
            return;
        }

        this.props.onClose();
    }

    //@ts-ignore
    private closeOnOutsideClick(e: React.MouseEvent): void {
        if (this.shouldCloseOnClick(e)) {
            this.props.onClose();
        }
    }

    //@ts-ignore
    private onDocumentMouseDown(e: React.MouseEvent): void {
        this.clickedInside = (this.overlayRef.current as any).contains(e.target);
    }

    //@ts-ignore
    private closeOnEscape(e: React.KeyboardEvent): void {
        if (
            this.isComponentMounted &&
            this.props.closeOnEscape &&
            e.keyCode === ENUM_KEY_CODE.KEY_CODE_ESCAPE
        ) {
            this.props.onClose();
        }
    }

    private updateListeners(method: string, props: IOverlayProps<T>) {
        events.forEach((event) => {
            if (props[event.handler] || props[event.requiredProp]) {
                const handler = this[event.handler];
                if (handler) {
                    (event.target || window)[`${method}EventListener`](event.name, handler);
                }
            }
        });
    }

    private addListeners(props: IOverlayProps<T>): void {
        this.updateListeners("add", props);
    }

    private removeListeners(props: IOverlayProps<T>): void {
        this.updateListeners("remove", props);
    }

    private renderMask(): false | JSX.Element {
        return this.props.isModal ? (
            <div className="modalityPlugin-mask modalityPlugin-mask-visible" onClick={this.onMaskClick} />
        ) : (
            false
        );
    }

    public render(): React.ReactNode {
        // Need stop propagation of events from Portal thats new behavior of react 16
        // https://github.com/facebook/react/issues/11387
        return (
            <span className="s-portal-scroll-anchor" ref={this.containerRef}>
                <Portal isOpen node={this.portalNode}>
                    {/* Do not prevent onScroll events - see ONE-4189 for details */}
                    <div
                        className={this.props.containerClassName}
                        onClick={this.props.onClick}
                        onMouseOver={this.props.onMouseOver}
                        onMouseUp={this.props.onMouseUp}
                    >
                        {this.renderMask()}

                        <div
                            ref={this.overlayRef}
                            style={this.getOverlayStyles()}
                            className={this.getOverlayClasses()}
                        >
                            {this.props.children}
                        </div>
                    </div>
                </Portal>
            </span>
        );
    }
}
