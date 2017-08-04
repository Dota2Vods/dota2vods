import React from "react";
import { Route } from "react-router-dom";
import RouterNavItem from "../utils/RouterNavItem";

export default ({ baseUrl, stages }) => (
    <ul className="nav nav-tabs">
        {Object.keys(stages).map((stage, index) => {
            const CustomNavItem = ({ forceActiveState }) => (
                <RouterNavItem to={baseUrl + stage} forceActiveState={forceActiveState}>
                    {stages[stage].name}
                </RouterNavItem>
            );

            if (index === 0) { //First index / stage also matches the baseUrl
                return (
                    <Route key={stage} exact path={baseUrl} children={({match}) => (
                            <CustomNavItem forceActiveState={match} />
                    )} />
                );
            }

            return <CustomNavItem key={stage} />;
        })}
    </ul>
);
