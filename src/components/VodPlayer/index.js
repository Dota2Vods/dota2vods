import React, { Component } from "react";
import YouTubePlayerWrapper from "./YouTubePlayerWrapper";
import CustomControls from "./CustomControls";

export default class VodPlayer extends Component {
    player;
    state = {
        hovered: false,
        showDebugInfo: false,
        controlsEnabled: false,
        playerInfo: null
    };

    onPlayerStateChange = event => {
        /*
          The youtube logo gets moved out of sight when our custom controls are enabled. However if there is a
          pre-roll ad this will also move the ad info and buttons and make it look ugly.
          This is why we first wait for the video to start (playerState === 1) before doing this.
          (Which should happen after the ad was played / skipped)
        */
        const playerState = event.data;
        if (playerState === 1) {
            this.setState({
                controlsEnabled: true
            });
        }
    }

    componentWillUnmount() {
        if (this.player && this.player.removeEventListener) {
            this.player.removeEventListener("onStateChange", this.onPlayerStateChange);
        }
    }

    onPlayerReady(player) {
        //Disable fullscreen because we use our own fullscreen (disabling it with a param still allows double click)
        player.getIframe().removeAttribute("allowfullscreen");

        //Some custom apis
        player.toggleDebugInfo = () => this.setState({
            showDebugInfo: !this.state.showDebugInfo
        });

        //Save for later use
        this.player = player;

        //Make player object public
        window.player = this.player;

        player.addEventListener("onStateChange", this.onPlayerStateChange);
    }

    render() {
        const { videoId, height, width } = this.props;
        const { hovered, controlsEnabled, playerInfo } = this.state;
        const playerVars = {
            autoplay: 0, //Setting autoplay to 1 doesn't increase the youtube views
            iv_load_policy: 3, //Don't show annotations
            rel: 0, //Don't show related videos (potential spoilers)
            start: this.props.start || 0
        };

        return (
            <div style={{
                    display: "inline-block",
                    position: "relative",
                    width: width + "px",
                    height: height + "px",
                    overflow: "hidden"
                }}
                onMouseOver={() => this.setState({hovered: true})}
                onMouseOut={() => this.setState({hovered: false})}
                className="vod-player"
            >
                <div style={{
                    position: "absolute",
                    top: "0px",
                    /*
                      Our custom controls would overlap with the original youtube logo so we move the youtube provided
                      one out of sight if they are enabled. (CustomControls has it's own YouTube logo)
                    */
                    left: (controlsEnabled ? "-100px" : null),
                    width: (controlsEnabled ? "calc(100% + 200px)": "100%"),
                    height: "100%"
                }}>
                    <YouTubePlayerWrapper
                        videoId={videoId}
                        onPlayerReady={player => this.onPlayerReady(player)}
                        onPlayerInfoUpdate={playerInfo => this.setState({playerInfo})}
                        opts={{
                            height: "100%",
                            width: "100%",
                            playerVars: { // https://developers.google.com/youtube/player_parameters
                                //Custom vars
                                ...playerVars,

                                //Required vars
                                controls: 0, //Gets replaced by our custom controls
                                showinfo: 0, //Must be 0 because the title would break with the bigger width
                                disablekb: 1 //Disable keyboard controls because it's buggy with iframes
                            }
                        }}
                    />
                </div>

                {this.state.showDebugInfo === true && (
                    <pre style={{
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.75)",
                        padding: "3px",
                        margin: "0px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        {JSON.stringify(this.state, null, 2)}
                    </pre>
                )}

                {controlsEnabled && (
                    <CustomControls
                        player={this.player}
                        playerInfo={playerInfo}
                        videoId={videoId}
                        hidden={!hovered && playerInfo.playerState !== 2}
                    />
                )}
            </div>
        );
    }
}
