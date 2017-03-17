import React from "react";
import { Link } from "react-router-dom";

export default ({ tournaments }) => (
    <ul>
        {tournaments.map(tournament => (
            <li key={tournament.id}>
                <Link to={"/" + tournament.id}>{tournament.name}</Link>
            </li>
        ))}
    </ul>
);
