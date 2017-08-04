import React from "react";
import DatesBox from "./DatesBox";
import InfoBox from "./InfoBox";

import "./MetaBoxes.scss";

export default ({ tournamentName, metaData }) => (
    <div>
        <DatesBox tournamentName={tournamentName} startDate={metaData.startDate} endDate={metaData.endDate} />
        <InfoBox info={metaData.info} infoSources={metaData.infoSources} />
    </div>
);
