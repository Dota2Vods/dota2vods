import React, { Component } from "react";
import Helmet from "react-helmet";
import { Route, matchPath, withRouter } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Error404Page from "../../pages/Error404";
import MetaBoxes from "./MetaBoxes";
import StageTabsNavigation from "./StageTabsNavigation";

class Tournament extends Component {
    state = {};
    baseUrl;

    updateSelectedStage({ location: { pathname }, tournament: { stagesOrder, defaultStage } }) {
        let selectedStage = defaultStage;
        for (let stage of stagesOrder) {
            if (matchPath(pathname, {
                exact: true,
                path: this.baseUrl + stage
            })) {
                selectedStage = stage;
                break;
            }
        }

        this.setState({
            selectedStage
        });
    }

    componentWillMount() {
        const { tournamentId, tournament} = this.props;

        this.baseUrl = "/" + tournamentId + "/";

        //If we already have the tournament prop on mount, update the selected stage
        if (tournament) {
            this.updateSelectedStage(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        //If we received the tournament prop, update the selected stage
        if(nextProps.tournament) {
            this.updateSelectedStage(nextProps);
        }
    }

    render() {
        const { tournamentId, tournament } = this.props;
        const { selectedStage } = this.state;

        if (typeof tournament === "undefined") {
            return <div>Loading...</div>
        }

        if (tournament === false) {
            return <Error404Page />;
        }

        const pageTitle = `${tournament.name} - ${tournament.stages[selectedStage].name}`;

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

                        <StageTabsNavigation baseUrl={this.baseUrl} stages={tournament.stages}
                            stagesOrder={tournament.stagesOrder} selectedStage={selectedStage} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(Tournament);
