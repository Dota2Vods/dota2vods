import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Navbar, Nav, FormGroup, FormControl } from "react-bootstrap";

import OverviewPage from "../pages/Overview";
import AboutPage from "../pages/About";
import NoMatchPage from "../pages/NoMatch";

const onClick = e => e.target.blur();

const RouterNavItem = ({to, children}) => (
  <Route path={to} children={({match}) => (
    <li role="presentation" className={match ? 'active' : ''}>
      <Link to={to} onClick={onClick}>{children}</Link>
    </li>
  )} />
);

export default () => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to="/" onClick={onClick} tabIndex="1">Dota2Vods.tv</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav bsStyle="pills" pullRight>
                <RouterNavItem to="/about" tabIndex="3">About</RouterNavItem>
            </Nav>

            <Navbar.Form>
                <FormGroup style={{width: "100%", maxWidth: "500px"}}>
                    <FormControl type="text" placeholder="Search for a tournament" tabIndex="2"
                        style={{width: "100%"}} />
                </FormGroup>
            </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
);
