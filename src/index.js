import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ApiProvider from "./json-store/ApiProvider";
import App from "./App";

ReactDOM.render(
    (
        <Router>
            <ApiProvider dataUrl="/data">
                <App />
            </ApiProvider>
        </Router>
    ),
    document.getElementById("root")
);
