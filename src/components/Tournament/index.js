import React from "react";
import Helmet from "react-helmet";
import { Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Error404Page from "../../pages/Error404";
import MetaBoxes from "./MetaBoxes";
import StageTabsNavigation from "./StageTabsNavigation";
import GroupTables from "./GroupTables";

export default ({ tournamentId, tournament }) => {
    if (typeof tournament === "undefined") {
        return <div>Loading...</div>
    }

    if (tournament === false) {
        return <Error404Page />;
    }

    const baseUrl = "/" + tournamentId + "/";

    return <Route exact path={baseUrl + ":selectedStage?"} children={({ match }) => {
        if (match === null) {
            return <Error404Page />;
        }

        const selectedStage = match.params.selectedStage ? match.params.selectedStage : tournament.defaultStage;
        const selectedStageData = tournament.stages[selectedStage];

        if (!selectedStageData) {
            return <Error404Page />;
        }

        const selectedStageType = selectedStageData.type;
        const pageTitle = `${tournament.name} - ${selectedStageData.name}`;

        return (
            <div className="tournament">
                <Helmet title={pageTitle} />

                <Row>
                    <Col md={4} mdPush={8}>
                        <MetaBoxes tournamentName={tournament.name} metaData={tournament.meta} />
                    </Col>
                    <Col md={8} mdPull={4}>
                        <div className="page-header">
                            <h2>{pageTitle}</h2>
                        </div>

                        <StageTabsNavigation baseUrl={baseUrl} stages={tournament.stages}
                            stagesOrder={tournament.stagesOrder} selectedStage={selectedStage} />

                        {selectedStageType === "groups" && (
                            <GroupTables stageData={selectedStageData} />
                        )}
                    </Col>
                </Row>
            </div>
        );
    }} />
}
