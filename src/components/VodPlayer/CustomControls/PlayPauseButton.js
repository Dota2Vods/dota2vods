import React from "react";

export default ({ onClick, isPaused })  => (
    <button onClick={onClick}>
        <svg version="1.1" viewBox="0 0 36 36" height="100%">
            {isPaused ? (
                <path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path>
            ) : (
                <path d="M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z"></path>
            )}
        </svg>
    </button>
);
