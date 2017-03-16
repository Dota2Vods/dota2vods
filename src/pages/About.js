import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

import readme from "../../README.md";

export default () => (
    <div>
        <Helmet title="About" />

        <div dangerouslySetInnerHTML={{__html: readme}} />
    </div>
);
