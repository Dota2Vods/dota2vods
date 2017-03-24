import React, { Component } from "react";
import Helmet from "react-helmet";
import { Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";
import Navigation from "./Navigation";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

import OverviewPage from "../pages/Overview";
import AboutPage from "../pages/About";
import TournamentPage from "../pages/Tournament";
import Error404Page from "../pages/Error404";

export default class App extends Component {
    render() {
        return (
            <div>
                <Helmet titleTemplate="%s | Dota2Vods.tv"
                    defaultTitle="Dota2Vods.tv, your source for Dota 2 tournament vods." />
                <Navigation />

                <Grid>
                    <Switch>
                        <Route exact path="/" component={OverviewPage} />
                        <Route exact path="/about" component={AboutPage} />
                        <Route exact strict path="/404.html" component={Error404Page} />
                        <Route path="/:tournamentId" component={TournamentPage} />
                    </Switch>
                </Grid>
            </div>
        );
    }
}
