import React from "react";
import url from "url";

//Special hostnames we know the name for
const hostnameToLabel = {
    "wiki.teamliquid.net": "Liquipedia"
};

//Takes a link and returns a fitting label for it, usually the hostname
function linkToLabel(link) {
    const { hostname } = url.parse(link);
    return hostnameToLabel[hostname] || hostname;
}

export default ({ info, infoSources}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">
                Information
            </h3>
        </div>
        <div className="panel-body" style={{padding: "0px"}}>
            {Object.keys(info).map(label => (
                <div key={label} className="tournament-meta-entry">
                    <div>{label}:</div>
                    <div>{info[label]}</div>
                </div>
            ))}
            <div className="tournament-meta-entry tournament-info-sources bg-info">
                <div className="text-info">Source:</div>
                {infoSources.map(sourceLink => (
                    <div key={sourceLink}>
                        <a href={sourceLink} target="_blank">{linkToLabel(sourceLink)}</a>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
