import React, { Component } from "react";

export default class AbstractProvider extends Component {
    static childContextTypes = {
        storeProvider: React.PropTypes.object
    };

    getChildContext() {
        return {
            storeProvider: this
        };
    }

    render() {
        return this.props.children;
    }

    get() {
        throw new Error("json-store: AbstractProvider::get() needs to be implemented!");
    }
}
