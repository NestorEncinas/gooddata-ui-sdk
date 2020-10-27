// (C) 2007-2020 GoodData Corporation
import React from "react";
import { injectIntl, FormattedMessage, IntlShape } from "react-intl";
import MediaQuery from "react-responsive";
import bindAll from "lodash/bindAll";
import { storiesOf } from "@storybook/react";
import { UiKit } from "../../../_infra/storyGroups";
// eslint-disable-next-line import/no-unresolved, import/extensions
import { Button, Overlay } from "@gooddata/sdk-ui-kit";
// import FullScreenOverlay from "../FullScreenOverlay";
/**
 * @internal
 */
interface IOverlayExampleProps {
    index: number;
    intl: IntlShape;
}
interface IOverlayExampleState {
    isOpen: boolean;
}
class OverlayExample extends React.Component<IOverlayExampleProps, IOverlayExampleState> {
    static defaultProps = {
        index: 0,
    };
    constructor(props: IOverlayExampleProps) {
        super(props);
        bindAll(this, "toggleOverlay");
        this.state = {
            isOpen: false,
        };
    }
    buttonText() {
        const { index, intl } = this.props;
        const t = intl.formatMessage;
        const openOverlay = t({ id: "gs.examples.overlay.openOverlay" });
        const closeOverlay = t({ id: "gs.examples.overlay.closeOverlay" });
        return this.state.isOpen ? `${closeOverlay}${index}` : `${openOverlay}${index}`;
    }
    toggleOverlay() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    renderOverlay() {
        const { index } = this.props;
        const colors = ["black", "limegreen", "red"];
        return this.state.isOpen ? (
            <div className="overlay-wrapper">
                <MediaQuery query="only screen and (min-width:640px)">
                    <Overlay
                        alignTo={`.overlay-example-opener-${this.props.index}`}
                        alignPoints={[
                            {
                                align: "bl tl",
                                offset: {
                                    x: 0,
                                    y: 15,
                                },
                            },
                            {
                                align: "br tr",
                                offset: {
                                    x: 0,
                                    y: 15,
                                },
                            },
                        ]}
                    >
                        <div
                            className="overlay"
                            style={{
                                width: "250px",
                                height: "200px",
                                padding: "20px",
                                background: colors[index],
                                color: "black",
                            }}
                        >
                            <h1>{index}</h1>
                            <p>
                                <FormattedMessage id="gs.examples.overlay.resizeBelow" />
                            </p>
                        </div>
                    </Overlay>
                </MediaQuery>
                {/* <MediaQuery query="only screen and (min-width:0px) and (max-width:640px)">
                    <FullScreenOverlay
                        alignTo="body"
                        alignPoints={[
                            {
                                align: "tl tl",
                            },
                        ]}
                    >
                        <div
                            className="overlay fullscreen"
                            style={{
                                boxSizing: "border-box",
                                width: "100%",
                                height: "100%",
                                padding: "100px",
                                background: colors[index],
                                color: "black",
                            }}
                        >
                            <FormattedMessage
                                tagName="h1"
                                id="gs.examples.overlay.fullscreenOverlayTitle"
                                values={{ index }}
                            />
                            <p>
                                <FormattedMessage id="gs.examples.overlay.resizeAbove" />
                            </p>
                            <p>
                                <Button
                                    className="gd-button-primary"
                                    value={this.buttonText()}
                                    onClick={this.toggleOverlay}
                                />
                            </p>
                        </div>
                    </FullScreenOverlay>
                </MediaQuery> */}
            </div>
        ) : (
            false
        );
    }
    render() {
        return (
            <div className="overlay-example">
                <Button
                    className={`gd-button-primary overlay-example-opener-${this.props.index}`}
                    value={this.buttonText()}
                    onClick={this.toggleOverlay}
                />
                {this.renderOverlay()}
            </div>
        );
    }
}
const InjectedOverlayExample = injectIntl(OverlayExample);
export default class OverlayExamples extends React.Component {
    render() {
        return (
            <div>
                <div style={{ float: "right" }}>
                    <InjectedOverlayExample index={2} />
                </div>
                <InjectedOverlayExample index={1} />
                <p>
                    Overlay accepts <code>alignTo</code> (selector of the element to which you want to align
                    the overlay) and array of align points. Align point has multiple properties -{" "}
                    <code>align</code> in form of string <code>bl tl</code>
                    (align bottom left corner of target element to top left corner of aligned element) and{" "}
                    <code>offset</code> consisting of x & y properties (number of pixels, which can be
                    negative). Align consist of two points which should be aligned one over another - first
                    specifies position of the point on target element, the second on the current - aligned -
                    overlay. The point is described in form of string (<code>bl</code>), where first letter
                    means one of 3 possible positions on vertical axis ((t)op, (c)enter, (b)ottom) and second
                    means position in horizontal axis ((l)eft, (c)enter, (r)ight). These points will be
                    aligned and moved by specified offset, which can be defined for each align point.
                </p>
                <p>
                    When multiple align points are specified, we try to choose the most optimal one respecting
                    given order. (Overlay could be outside the viewport or partially visible using some of the
                    align points). Aligning consists of two steps: aligning in the viewport and aligning in
                    the page.
                </p>
                <p>
                    Usually, only first step is used for aligning the bubbles, dropdowns, etc., second step is
                    necessary for programmatically opened overlays outside of the viewport or overlays which
                    need to be realigned after orientation change of the device (thereby appearing outside of
                    the viewport after layout change).
                </p>
                <p>
                    Align classes of chosen align point will be generated and added to the aligned overlay,
                    which can be useful for positioning the arrow on the bubble or dialog. There are generated
                    two css classes - one for chosen align point of target element (<code>target-tr</code>),
                    the second one for chosen align point of current positioned overlay (<code>self-tl</code>
                    ).
                </p>
                <p>
                    In the first step, overlay will try to align itself to most optimal position in the
                    viewport. It measures itself and target element and tries to align to first position,
                    where it will be fully visible. If there is not such position, it will choose the position
                    where the most of the aligned element is in the viewport.
                </p>
                <p>
                    Second step - aligning in the whole page - is used when aligned element is fully hidden in
                    the viewport using all possible align points.
                </p>
            </div>
        );
    }
}

storiesOf(`${UiKit}/Overlay`, module).add("full-featured", () => <OverlayExamples />);
