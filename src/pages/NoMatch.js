import React from "react";
import Helmet from "react-helmet";
import { Jumbotron } from "react-bootstrap";

export default () => (
    <div>
        <Helmet title="404" />
        <Jumbotron>
            <div className="text-danger"><h1>404</h1></div>
            <p>Page not found</p>
        </Jumbotron>
    </div>
);
