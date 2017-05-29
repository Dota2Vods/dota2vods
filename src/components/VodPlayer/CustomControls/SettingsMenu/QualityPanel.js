import React from "react";

import QualityLabel from "./QualityLabel";

export default ({ onBack, onSelect, availableQualityLevels, selectedQuality }) => (
    <div className="ytp-panel">
        <div className="ytp-panel-header">
            <button onClick={onBack}>Quality</button>
        </div>
        <div className="ytp-panel-menu ytp-quality-menu" role="menu">
            {availableQualityLevels.map(quality => (
                <div
                    key={quality}
                    className="ytp-menuitem"
                    role="menuitemradio"
                    aria-checked={quality === selectedQuality}
                    onClick={() => onSelect(quality)}
                >
                    <div className="ytp-menuitem-label">
                        <QualityLabel quality={quality} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
