import React from "react";
import TournamentList from "./TournamentList";

export default ({ data }) => {
    if (data === undefined) {
        return <div>Loading...</div>;
    }
    if (data === false) {
        return <div>Something went wrong, could not find the tournaments overview data. :/</div>;
    }

    return (
        <div>
            <p>Recently added:</p>
            <TournamentList tournaments={data["recently-added"]} />
        </div>
    );
};
