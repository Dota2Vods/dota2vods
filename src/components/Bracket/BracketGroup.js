import React, { Component } from "react";

function findTeamName(round) {
    if (typeof round === "string") {
        return round;
    }

    if (!round.done) {
        return "TBD";
    }

    if (round.score[0] > round.score[1]) {
        return findTeamName(round.team1);
    } else {
        return findTeamName(round.team2);
    }
}

export default class BracketGroup extends Component {
    render() {
        const bracket = this.props.bracket;
        const score = bracket.score;

        let sideA, sideB, team1, team2;
        switch (typeof bracket.team1) {
            case "string":
                team1 = bracket.team1;
                break;
            case "object":
                sideA = bracket.team1;
                team1 = findTeamName(bracket.team1);
                break;
        }
        switch (typeof bracket.team2) {
            case "string":
                team2 = bracket.team2;
                break;
            case "object":
                sideB = bracket.team2;
                team2 = findTeamName(bracket.team2);
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
                        <div data-tbd={team1 === "TBD"}>
                            {team1}
                            <span>{score[0]}</span>
                        </div>
                        <div data-tbd={team2 === "TBD"}>
                            {team2}
                            <span>{score[1]}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
