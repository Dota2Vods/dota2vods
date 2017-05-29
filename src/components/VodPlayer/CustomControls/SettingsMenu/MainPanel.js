import React from "react";

import QualityLabel from "./QualityLabel";

export default ({ onSelect, selectedSpeed, selectedQuality, qualityIsAuto }) => (
    <div className="ytp-panel">
        <div className="ytp-panel-menu">
            <div className="ytp-menuitem" aria-haspopup="true" onClick={() => onSelect("speed")}>
                <div className="ytp-menuitem-label">Speed</div>
                <div className="ytp-menuitem-content">
                    {selectedSpeed === 1 ? "Normal" : selectedSpeed}
                </div>
            </div>
            <div className="ytp-menuitem" aria-haspopup="true" onClick={() => onSelect("quality")}>
                <div className="ytp-menuitem-label">Quality</div>
                <div className="ytp-menuitem-content">
                    <QualityLabel quality={qualityIsAuto ? "auto" : selectedQuality} />
                    {" "}
                    {qualityIsAuto && (
                        <span className="ytp-menu-label-secondary">
                            <QualityLabel quality={selectedQuality} />
                        </span>
                    )}
                </div>
            </div>
        </div>
    </div>
);
