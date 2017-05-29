import React, { Component } from "react";
import millisecondsToYoutubeFormat from "format-duration";
import skipOptionToMilliseconds from "parse-duration";

import "./CustomControls.scss";

import SettingsMenu from "./SettingsMenu";
import PlayPauseButton from "./PlayPauseButton";
import MuteButton from "./MuteButton";
import SettingsButton from "./SettingsButton";
import WatchOnYouTubeButton from "./WatchOnYouTubeButton";
import FullScreenButton from "./FullScreenButton";

export default class CustomControls extends Component {
    skipOptions = ["-5m", "-1m", "-10s", "+10s", "+1m", "+5m"];
    state = {
        showSettingsMenu: false
    };

    togglePlayerState() {
        const player = this.props.player;

        //See https://developers.google.com/youtube/iframe_api_reference#getPlayerState
        if (this.props.playerInfo.playerState === 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    toggleMute() {
        const { player, playerInfo: { isMuted } } = this.props;
        if (isMuted) {
            player.unMute();
        } else {
            player.mute();
        }
    }

    seekRelative(skipOption) {
        const { player } = this.props;

        const delta = skipOptionToMilliseconds(skipOption) / 1000;
        player.seekTo(player.getCurrentTime() + delta);
    }

    render() {
        const { player, playerInfo, videoId, hidden } = this.props;
        const { showSettingsMenu } = this.state;

        const hideControls = hidden && !showSettingsMenu;
        const controlsHolderStyle = {
           opacity: hideControls ? 0 : 1,
           transition: hideControls ? "opacity .1s cubic-bezier(0.4,0.0,1,1)" : "opacity .25s cubic-bezier(0.0,0.0,0.2,1)"
        };

        return (
             <div style={controlsHolderStyle}>
                <div className="ytp-gradient-bottom" />

                {showSettingsMenu && (
                    <SettingsMenu player={player} playerInfo={playerInfo} onHide={() => this.setState({
                        showSettingsMenu: false
                    })} />
                )}

                <div className="ytp-custom-controls">
                    <div className="ytp-middle-controls">
                        <div className="skip-options">
                            {this.skipOptions.map(skipOption => (
                                <span key={skipOption}>
                                    <button onClick={e => this.seekRelative(skipOption)}>{skipOption}</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="ytp-left-controls">
                        <PlayPauseButton
                            onClick={e => this.togglePlayerState()}
                            isPaused={playerInfo.playerState !== 1}
                        />
                        <MuteButton
                            onClick={e => this.toggleMute()}
                            isMuted={playerInfo.isMuted}
                        />
                        <span>{millisecondsToYoutubeFormat(playerInfo.time * 1000)}</span>
                    </div>

                    <div className="ytp-right-controls">
                        <SettingsButton onClick={() => this.setState({
                            showSettingsMenu: !showSettingsMenu
                        })} />
                        <WatchOnYouTubeButton videoId={videoId} player={player} />
                        <FullScreenButton />
                    </div>
                </div>
            </div>
        );
    }
}
