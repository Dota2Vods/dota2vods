import React from "react";
import { Route, Link } from "react-router-dom";
import { Navbar, Nav, FormGroup, FormControl } from "react-bootstrap";
import RouterNavItem from "../components/utils/RouterNavItem";
import { connect } from "../json-store";
import NavSearchBox from "../components/NavSearchBox";

import "./Navigation.scss";

export default () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/" onClick={e => e.target.blur()} tabIndex="1">Dota2Vods.tv</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
                <RouterNavItem exact strict to="/about" tabIndex="3">About</RouterNavItem>
            </Nav>

            <Navbar.Form>
                {connect(<NavSearchBox tabIndex="2" />, {
                    tournamentList: "tournament-list"
                })}

            </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
);
