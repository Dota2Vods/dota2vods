import React from "react";
import SuggestionsBoxItem from "./SuggestionsBoxItem";

import "./SuggestionsBox.scss";

export default ({ suggestions }) => (
    <div className="suggestions-box">
        {suggestions.map(suggestion => (
            <SuggestionsBoxItem key={suggestion.url}  suggestion={suggestion} />
        ))}
    </div>
);
