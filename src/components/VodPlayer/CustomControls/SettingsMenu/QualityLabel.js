import React from "react";

const qualityLevelsLabels = {
    "hd1080": "1080p",
    "hd720": "720p",
    "large": "480p",
    "medium": "360p",
    "small": "240p",
    "tiny": "144p",
    "auto": "Auto"
};

export default ({ quality }) => (
    <span>
        {qualityLevelsLabels[quality]}
        {quality.startsWith("hd") && (
            <span> <sup className="ytp-swatch-color">HD</sup></span>
        )}
    </span>
);
