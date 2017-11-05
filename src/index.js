import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ApiProvider from "./json-store/ApiProvider";
import App from "./App";

const rootElement = document.getElementById("root");
let renderFunction = ReactDOM.hydrate;

if (!rootElement.firstChild) {
    //If root element is empty, use `render()` instead
    renderFunction = ReactDOM.render;
}

renderFunction(
    (
        <Router>
            <ApiProvider dataUrl="/data">
                <App />
            </ApiProvider>
        </Router>
    ),
    rootElement
);
