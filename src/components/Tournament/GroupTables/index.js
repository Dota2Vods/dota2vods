import React from "react";
import { Row, Col } from "react-bootstrap";
import GroupTable from "./GroupTable";

export default ({ stageData: { groups, displayInfo } }) => {
    const groupIds = Object.keys(groups);
    const collumnsPerGroup = Math.max(12 / groupIds.length, 4); //4 should be the minimum amount of collums

    return (
        <Row style={{marginTop: "10px"}}>
            {groupIds.map(groupId => (
                <Col key={groupId} sm={collumnsPerGroup}>
                    <GroupTable group={groups[groupId]} displayInfo={displayInfo} />
                </Col>
            ))}
        </Row>
    );
};
