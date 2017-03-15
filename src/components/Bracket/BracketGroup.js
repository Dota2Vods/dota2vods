import React, { Component } from "react";

export default class BracketGroup extends Component {
    render() {
        const bracket = this.props.bracket;

        let sideA, sideB, team1, team2;
        switch (typeof bracket.team1) {
            case "string":
                team1 = bracket.team1;
                break;
            case "object":
                sideA = bracket.team1;
                break;
        }
        switch (typeof bracket.team2) {
            case "string":
                team2 = bracket.team2;
                break;
            case "object":
                sideB = bracket.team2;
                break;
        }

        return (
            <div className="bracket-group">
                { (sideA || bracket.separated || sideB) && <div>
                    { sideA && <BracketGroup bracket={sideA} /> }
                    { bracket.separated && <div className="separator" /> }
                    { sideB && <BracketGroup bracket={sideB} /> }
                </div> }
                <div className="match-holder">
                    <div className="horizontal-connector" />
                    <div className="vertical-connector" />
                    <div className="match">
                        <div>{ team1 || "?" }</div>
                        <div>{ team2 || "?" }</div>
                    </div>
                </div>
            </div>
        );
    }
}
