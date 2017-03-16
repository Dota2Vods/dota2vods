import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";
import Navigation from "./Navigation";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

import OverviewPage from "../pages/Overview";
import AboutPage from "../pages/About";
import NoMatchPage from "../pages/NoMatch";

export default class App extends Component {
    render() {
        return (
            <div>
                <Navigation />

                <Grid>
                    <Switch>
                        <Route exact path="/" component={OverviewPage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Route component={NoMatchPage} />
                    </Switch>
                </Grid>
            </div>
        );
    }
}
