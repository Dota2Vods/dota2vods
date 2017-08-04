import React from "react";
import Helmet from "react-helmet";
import { Row, Col } from "react-bootstrap";
import Error404Page from "../../pages/Error404";
import MetaBoxes from "./MetaBoxes";

export default ({ tournament }) => {
    if (typeof tournament === "undefined") {
        return <div>Loading...</div>
    }

    if (tournament === false) {
        return <Error404Page />;
    }

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
                </Col>
            </Row>
        </div>
    );
};
