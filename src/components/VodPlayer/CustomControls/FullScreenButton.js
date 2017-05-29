import React from "react";
import screenfull from "screenfull";

const onClick = e => {
    //Find vodPlayer
    let vodPlayer = e.target;
    while (!vodPlayer.classList.contains("vod-player")) {
        vodPlayer = vodPlayer.parentNode;
    }

    if (screenfull) {
        screenfull.toggle(vodPlayer);
    }
};

export default props => (
    <button title="Full screen" onClick={onClick}>
        <svg version="1.1" viewBox="0 0 36 36" height="100%" >
            <path d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path>
            <path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path>
            <path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path>
            <path d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path>
        </svg>
    </button>
);
