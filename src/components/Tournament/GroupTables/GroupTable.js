import React, { Component } from "react";
import { Table } from "react-bootstrap";

import "./GroupTable.scss";

export default class GroupTable extends Component {
    state = {
        resultVisibleForTeam: {}
    }

    constructor(props) {
        super(props);

        for (const team of this.props.group.teams) {
            this.state.resultVisibleForTeam[team.name] = false;
        }
    }

    showResultForTeam(teamName) {
        let resultVisibleForTeam = {
            ...this.state.resultVisibleForTeam
        };
        resultVisibleForTeam[teamName] = true;

        this.setState({
            resultVisibleForTeam
        });
    }

    render() {
        const { group, displayInfo } = this.props;
        const { resultVisibleForTeam } = this.state;

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
                <tbody>
                    {group.teams.map((team, index) => (
                        <tr key={team.name}>
                            <td>{index + 1}.</td>
                            <td>{team.name}</td>
                            <td className="text-center">
                                {resultVisibleForTeam[team.name] === true && team.endResult.join("-")}
                                {resultVisibleForTeam[team.name] !== true && (
                                    <a href="javascript:void(0);" onClick={() => this.showResultForTeam(team.name)}>
                                        Show
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
