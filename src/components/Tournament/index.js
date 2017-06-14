import React from "react";
import Helmet from "react-helmet";
import Error404Page from "../../pages/Error404";

export default ({ tournament }) => {
    if (typeof tournament === "undefined") {
        return <div>Loading...</div>
    }

    if (tournament === false) {
        return <Error404Page />;
    }

    return (
        <div>
            <Helmet title={tournament.name} />
            {tournament.name}
        </div>
    );
};
