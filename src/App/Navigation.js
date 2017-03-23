import React from "react";
import { Route, Link } from "react-router-dom";
import { Navbar, Nav, FormGroup, FormControl } from "react-bootstrap";
import { connect } from "../json-store";
import NavSearchBox from "../components/NavSearchBox";

import "./Navigation.scss";

const RouterNavItem = ({to, children}) => (
  <Route path={to} children={({match}) => (
    <li role="presentation" className={match ? 'active' : ''}>
      <Link to={to} onClick={onClick}>{children}</Link>
    </li>
  )} />
);

const onClick = e => e.target.blur();

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
                {connect(<NavSearchBox tabIndex="2" />, {
                    tournamentList: "tournament-list"
                })}

            </Navbar.Form>
        </Navbar.Collapse>
    </Navbar>
);
