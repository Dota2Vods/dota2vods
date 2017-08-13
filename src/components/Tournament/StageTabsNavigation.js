import React from "react";
import { Link } from "react-router-dom";

export default ({ baseUrl, stages, stagesOrder, selectedStage }) => (
    <ul className="nav nav-tabs">
        {stagesOrder.map(stage => (
            <li key={stage} role="presentation" className={stage === selectedStage ? 'active' : ''}>
              <Link to={baseUrl + stage}>{stages[stage].name}</Link>
            </li>
        ))}
    </ul>
);
