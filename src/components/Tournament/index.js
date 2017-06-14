import React from "react";
import url from "url";
import Helmet from "react-helmet";
import Error404Page from "../../pages/Error404";

import "./tournament.scss";

//Special hostnames we know the name for
const hostnameToLabel = {
    "wiki.teamliquid.net": "Liquipedia"
};

//Takes a link and returns a fitting label for it, usually the hostname
function linkToLabel(link) {
    const { hostname } = url.parse(link);
    return hostnameToLabel[hostname] || hostname;
}

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
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            {tournament.name}
                        </h3>
                    </div>
                    <div className="panel-body" style={{padding: "0px"}}>
                        <div className="tournament-meta-entry">
                            <div>Start Date:</div>
                            <div>{tournament.meta.startDate}</div>
                        </div>
                        <div className="tournament-meta-entry">
                            <div>End Date:</div>
                            <div>{tournament.meta.endDate}</div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            Information
                        </h3>
                    </div>
                    <div className="panel-body" style={{padding: "0px"}}>
                        {Object.keys(tournament.meta.info).map(label => (
                            <div key={label} className="tournament-meta-entry">
                                <div>{label}:</div>
                                <div>{tournament.meta.info[label]}</div>
                            </div>
                        ))}
                        <div className="tournament-meta-entry tournament-info-sources bg-info">
                            <div className="text-info">Source:</div>
                            {tournament.meta.infoSources.map(sourceLink => (
                                <div key={sourceLink}>
                                    <a href={sourceLink} target="_blank">{linkToLabel(sourceLink)}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-header" style={{
                marginRight: "312px"
            }}>
                <h2>{tournament.name}</h2>
            </div>
        </div>
    );
};
