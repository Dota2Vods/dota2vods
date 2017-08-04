import React from "react";
import Helmet from "react-helmet";
import Error404Page from "../../pages/Error404";
import MetaBoxes from "./MetaBoxes";

export default ({ tournament }) => {
    if (typeof tournament === "undefined") {
        return <div>Loading...</div>
    }

    if (tournament === false) {
        return <Error404Page />;
    }

    return (
        <div className="tournament">
            <Helmet title={tournament.name} />

            <div className="pull-right">
                <MetaBoxes tournamentName={tournament.name} metaData={tournament.meta} />
            </div>

            <div className="page-header" style={{
                marginRight: "312px"
            }}>
                <h2>{tournament.name}</h2>
            </div>
        </div>
    );
};
