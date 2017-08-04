import React from "react";
import Helmet from "react-helmet";
import { Row, Col } from "react-bootstrap";
import Error404Page from "../../pages/Error404";
import MetaBoxes from "./MetaBoxes";
import StageTabsNavigation from "./StageTabsNavigation";

export default ({ tournamentId, tournament }) => {
    if (typeof tournament === "undefined") {
        return <div>Loading...</div>
    }

    if (tournament === false) {
        return <Error404Page />;
    }

    const baseUrl = "/" + tournamentId + "/";

    return (
        <div className="tournament">
            <Helmet title={tournament.name} />

            <Row>
                <Col md={4} mdPush={8}>
                    <MetaBoxes tournamentName={tournament.name} metaData={tournament.meta} />
                </Col>
                <Col md={8} mdPull={4}>
                    <div className="page-header">
                        <h2>{tournament.name}</h2>
                    </div>

                    <StageTabsNavigation baseUrl={baseUrl} stages={tournament.stages} />
                </Col>
            </Row>
        </div>
    );
};
