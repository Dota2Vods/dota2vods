import React, { Component } from "react";

import "./SettingsMenu.scss";

import MainPanel from "./MainPanel";
import SpeedPanel from "./SpeedPanel";
import QualityPanel from "./QualityPanel";

export default class SettingsMenu extends Component {
    state = {
        selectedPanel: "main"
    };

    componentDidMount() {
        const { player } = this.props;
        this.setState({
            availablePlaybackRates: player.getAvailablePlaybackRates(),
            availableQualityLevels: player.getAvailableQualityLevels()
        });
    }

    render() {
        const { onHide, player, playerInfo} = this.props;
        const {
            playbackRate: selectedSpeed,
            playbackQuality: selectedQuality,
            playbackQualityIsAuto: qualityIsAuto
        } = playerInfo;

        const { selectedPanel, availablePlaybackRates, availableQualityLevels } = this.state;

        const onBack = () => this.setState({
            selectedPanel: "main"
        });
        const panels = {
            "main": (
                <MainPanel
                    onSelect={selectedPanel => this.setState({
                        selectedPanel
                    })}
                    selectedSpeed={selectedSpeed}
                    selectedQuality={selectedQuality}
                    qualityIsAuto={qualityIsAuto}
                />
            ),
            "speed": (
                <SpeedPanel
                    onBack={onBack}
                    onSelect={playbackRate => {
                        player.setPlaybackRate(playbackRate);
                        //The original youtube player only goes back to the main panel
                        setTimeout(onBack, 100); //Give the player some time to update
                    }}
                    availablePlaybackRates={availablePlaybackRates}
                    selectedSpeed={selectedSpeed}
                />
            ),
            "quality": (
                <QualityPanel
                    onBack={onBack}
                    onSelect={quality => {
                        player.setPlaybackQuality(quality);
                        //The original youtube player hides the settings menu
                        onHide();
                    }}
                    availableQualityLevels={availableQualityLevels}
                    selectedQuality={qualityIsAuto ? "auto" : selectedQuality}
                />
            )
        };

        return (
            <div className="ytp-settings-menu">
                {panels[selectedPanel]}
            </div>
        );
    }
}
