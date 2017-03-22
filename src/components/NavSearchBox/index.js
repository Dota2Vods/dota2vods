import React, { Component } from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import findTournamentNameMatches from "./findTournamentNameMatches";
import SuggestionsBox from "./SuggestionsBox";

export default class NavSearchBox extends Component {
    state = {
        suggestions: []
    }

    updateSuggestions(e) {
        const tournamentList = this.props.tournamentList;
        const value = e.target.value;

        const tournamentToSuggestion = tournament => ({
            url: "/" + tournament.id,
            text: tournament.name,
            matches: []
        });

        if (value.length === 0) { //If search field is empty, show the last 5 tournaments added
            this.setState({
                suggestions: tournamentList.slice(0, 5).map(tournamentToSuggestion)
            });
            return;
        }

        let suggestions = [];
        for (const tournament of tournamentList) {
            const { sortIndex, matches } = findTournamentNameMatches(tournament.name, value);
            if (matches === false) {
                continue;
            }

            suggestions.push({...tournamentToSuggestion(tournament), sortIndex, matches});
        }

        suggestions.sort((a, b) => a.sortIndex - b.sortIndex);
        suggestions.splice(10); //Show a maximum of 10 suggestions

        this.setState({
            suggestions
        });
    }

    blur() {
        //Hide suggestions after 100ms (so the router has time to detect a possible click event)
        setTimeout(() => this.setState({
            suggestions: []
        }), 100);
    }

    render() {
        const updateSuggestions = this.updateSuggestions.bind(this);

        return (
            <FormGroup className="nav-search-box">
                <FormControl type="text" placeholder="Search for a tournament" tabIndex={this.props.tabIndex}
                    onFocus={updateSuggestions}
                    onChange={updateSuggestions}
                    onBlur={this.blur.bind(this)}
                />
                <SuggestionsBox suggestions={this.state.suggestions} />
            </FormGroup>
        );
    }
}
