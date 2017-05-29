import React, { Component } from "react";
import YouTube from "react-youtube";

export default class YouTubePlayerWrapper extends Component {
    timeInterval;
    playerInfo = {
        playerState: -1
    };
    updatePlayerInfoWating = false;

    updatePlayerInfo(newPlayerInfo) {
        Object.assign(this.playerInfo, newPlayerInfo);

        //Only send a player update once per tick
        if (this.updatePlayerInfoWating === false) {
            this.updatePlayerInfoWating = true;
            setImmediate(() => {
                this.props.onPlayerInfoUpdate(this.playerInfo);
                this.updatePlayerInfoWating = false;
            });
        }
    }

    updatePlayerTime() {
        this.updatePlayerInfo({
            time: Math.round(this.player.getCurrentTime())
        });
    }

    updateVolume() {
        this.updatePlayerInfo({
            volume: this.player.getVolume(),
            isMuted: this.player.isMuted()
        });
    }

    componentDidMount() {
        //Send initial playerInfo object
        this.props.onPlayerInfoUpdate(this.playerInfo);
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval);
    }

    onPlayerReady(player) {
        this.player = player;
        this.props.onPlayerReady(player);

        //Hook into the player api for changes that we don't receive events for
        const playerHooks = {
            "mute": () => this.updatePlayerInfo({
                isMuted: true
            }),
            "unMute": () => this.updatePlayerInfo({
                isMuted: false
            }),
            "setVolume": volume => this.updatePlayerInfo({
                volume
            }),
            "seekTo": time => this.updatePlayerInfo({
                time: Math.round(time)
            }),
            "setPlaybackQuality": quality => this.updatePlayerInfo({
                playbackQualityIsAuto: quality === "auto"
            })
        };
        let realMethods = {};
        for (const method of Object.keys(playerHooks)) {
            realMethods[method] = player[method];
            player[method] = function() {
                realMethods[method].apply(player, arguments);
                playerHooks[method].apply(player, arguments);
            };
        }
    }

    onPlayerStateChange(playerState) {
        if (this.playerInfo.playerState === -1 && playerState !== -1) {
            //Set some basic settings for the controls when player was not started before
            this.updatePlayerTime();
            this.updatePlayerInfo({
                duration: this.player.getDuration()
            });
            this.updateVolume();
            this.updatePlayerInfo({
                playbackQuality: this.player.getPlaybackQuality(),
                playbackQualityIsAuto: true, //There is no way we can check this so we just assume it's auto at start
                playbackRate: this.player.getPlaybackRate()
            });
        }

        //Update player state
        this.updatePlayerInfo({
            playerState
        });

        if (playerState === 1) {
            //Player started playing, update time
            this.updatePlayerTime();

            //Set interval to update the current time automatically
            this.timeInterval = setInterval(() => {
                this.updatePlayerTime();
            }, 1000);
        } else {
            //Clear interval if player is not playing
            clearInterval(this.timeInterval);
        }
    }

    onPlayerPlaybackQualityChange(playbackQuality) {
        this.updatePlayerInfo({
            playbackQuality
        });
    }

    onPlayerPlaybackRateChange(playbackRate) {
        this.updatePlayerInfo({
            playbackRate
        });
    }

    render() {
        return (
            <YouTube
                videoId={this.props.videoId}
                onReady={e => this.onPlayerReady(e.target)}
                onStateChange={e => this.onPlayerStateChange(e.data)}
                onPlaybackQualityChange={e => this.onPlayerPlaybackQualityChange(e.data)}
                onPlaybackRateChange={e => this.onPlayerPlaybackRateChange(e.data)}
                opts={this.props.opts}
            />
        );
    }
}
