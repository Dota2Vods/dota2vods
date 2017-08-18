import React, { Component } from "react";
import { Table } from "react-bootstrap";
import FlipMove from "react-flip-move";

import "./GroupTable.scss";

export default class GroupTable extends Component {
    state = {}

    constructor(props) {
        super(props);

        //Prepare teams
        this.state.teams = JSON.parse(JSON.stringify(this.props.group.teams));
        for (let team of this.state.teams) {
            team.showResult = false;
        }
    }

    showResultForTeam(teamName) {
        //Clone teams so `setState()` can work its magic
        let teams = JSON.parse(JSON.stringify(this.state.teams));

        //Update `showResult` property
        for (let team of teams) {
            if (team.name === teamName) {
                team.showResult = true;
                break;
            }
        }

        //Sort teams
        const behindLastPlace = teams.length + 1;
        teams.sort((teamA, teamB) => {
            //Put the team at the end of the table if results are not shown yet
            const teamAPlace = teamA.showResult === true ? teamA.endPlace : behindLastPlace;
            const teamBPlace = teamB.showResult === true ? teamB.endPlace : behindLastPlace;

            return teamAPlace - teamBPlace;
        });

        //Update state
        this.setState({
            teams
        });
    }

    render() {
        const { group, displayInfo } = this.props;
        const { teams } = this.state;

        let resultsHeader = [];
        for (const resultMeaning of displayInfo.resultsMeaning) {
            resultsHeader.push(
                (
                    <abbr key={resultMeaning} title={resultMeaning}>{resultMeaning.substr(0, 1)}</abbr>
                ),
                (
                    <span key={resultMeaning + "-"}>-</span>
                )
            );
        }
        resultsHeader.pop();

        return (
            <Table condensed className="group-table">
                <thead>
                    <tr>
                        <th colSpan={2}>{group.name}</th>
                        <th className="text-center">{resultsHeader}</th>
                    </tr>
                </thead>
                <FlipMove typeName="tbody">
                    {teams.map((team, index) => (
                        <tr key={team.name}>
                            <td>{index + 1}.</td>
                            <td>{team.name}</td>
                            <td className="text-center">
                                {team.showResult === true && team.endResult.join("-")}
                                {team.showResult !== true && (
                                    <a href="javascript:void(0);" onClick={() => this.showResultForTeam(team.name)}>
                                        Show
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                </FlipMove>
            </Table>
        );
    }
}
