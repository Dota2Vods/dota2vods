import React from "react";
import { connect } from "../json-store";
import Tournament from "../components/Tournament";

export default ({ match: { params: { tournamentId } } }) => connect(<Tournament tournamentId={tournamentId} />, {
    tournament: "tournaments/" + tournamentId
});
