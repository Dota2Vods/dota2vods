import React from "react";

export default ({tournamentName, startDate, endDate}) => (
    <div className="panel panel-default">
        <div className="panel-heading">
            <h3 className="panel-title">
                {tournamentName}
            </h3>
        </div>
        <div className="panel-body" style={{padding: "0px"}}>
            <div className="tournament-meta-entry">
                <div>Start Date:</div>
                <div>{startDate}</div>
            </div>
            <div className="tournament-meta-entry">
                <div>End Date:</div>
                <div>{endDate}</div>
            </div>
        </div>
    </div>
);
