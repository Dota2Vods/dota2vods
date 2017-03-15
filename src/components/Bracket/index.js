import React, { Component } from "react";
import BracketGroup from "./BracketGroup";

import "./bracket.scss";

export default class Bracket extends Component {
    render() {
        return (
            <BracketGroup bracket={this.props.bracket} />
        );
    }
}
