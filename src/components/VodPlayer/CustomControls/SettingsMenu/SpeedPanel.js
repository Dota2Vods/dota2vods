import React from "react";

export default ({ onBack, onSelect, availablePlaybackRates, selectedSpeed }) => (
    <div className="ytp-panel">
        <div className="ytp-panel-header">
            <button onClick={onBack}>Speed</button>
        </div>
        <div className="ytp-panel-menu" role="menu">
            {availablePlaybackRates.map(playbackRate => (
                <div
                    key={playbackRate}
                    className="ytp-menuitem"
                    role="menuitemradio"
                    aria-checked={playbackRate === selectedSpeed}
                    onClick={() => onSelect(playbackRate)}
                >
                    <div className="ytp-menuitem-label">
                        {playbackRate === 1 ? "Normal" : playbackRate}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
