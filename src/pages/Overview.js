import React from "react";
import { connect } from "../json-store";

import TournamentOverview from "../components/TournamentsOverview";

export default () => <div>
    {connect(<TournamentOverview />, {
        data: "tournaments-overview"
    })}
</div>;
