import React from "react";
import { Link } from "react-router-dom";

function normalizeMatches(matches) {
    matches.sort((a, b) => a.start - b.start || a.end - b.end); //If a.start - b.start === 0, use .end to sort

    //Make sure matches don't overlap
    for (let i = 0; i <= matches.length - 1;) {
        if (i === 0) {
            i++;
            continue;
        }

        const previousMatch = matches[i - 1];
        const currentMatch = matches[i];

        if (currentMatch.start <= previousMatch.end) {
            if (currentMatch.end > previousMatch.end) {
                previousMatch.end = currentMatch.end;
            }

            //curentMatch now gets fully covered by previousMatch so we can just remove it
            matches.splice(i, 1);
        } else {
            i++;
        }
    }

    return matches;
}

export default ({suggestion: { text, url, matches }}) => {
    matches = normalizeMatches(matches);

    let lastEnd = -1;
    let highlightedText = [];

    for (const { start, end } of matches) {
        highlightedText.push(text.substring(lastEnd + 1, start));

        const matchText = text.substring(start, end + 1);
        highlightedText.push(<strong key={start}>{matchText}</strong>);

        lastEnd = end;
    }

    if (lastEnd !== text.length - 1) {
        highlightedText.push(text.substring(lastEnd + 1));
    }

    return <Link to={url}>{highlightedText}</Link>
};
