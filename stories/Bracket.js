import React from 'react';
import { storiesOf } from '@storybook/react';

import Bracket from '../src/components/Bracket';

storiesOf('Bracket', module)
    .add('4 teams', () => {
        const bracketData = {
            team1: {
                team1: "Na'vi",
                team2: "Secret",
                score: [0, 2],
                done: true
            },
            team2: {
                team1: "EG",
                team2: "Liquid",
                score: [1, 2],
                done: true
            },
            score: [0, 0],
            done: false
        };

        return <Bracket bracket={bracketData} />
    })
    .add('6 teams', () => {
        const bracketData = {
            team1: {
                team1: {
                    team1: "Na'vi",
                    team2: "Secret",
                    score: [0, 2],
                    done: true
                },
                team2: {
                    team1: "EG",
                    team2: "Liquid",
                    score: [1, 2],
                    done: true
                },
                score: [0, 0],
                done: false
            },
            separated: true,
            team2: {
                team1: "OG",
                team2: "The greeks",
                score: [0, 2],
                done: true
            },
            score: [0, 0],
            done: false
        };

        return <Bracket bracket={bracketData} />
    })
    .add('8 teams', () => {
        const bracketData = {
            team1: {
                team1: {
                    team1: "Na'vi",
                    team2: "Secret",
                    score: [0, 2],
                    done: true
                },
                team2: {
                    team1: "EG",
                    team2: "Liquid",
                    score: [1, 2],
                    done: true
                },
                score: [0, 0],
                done: false
            },
            separated: true,
            team2: {
                team1: {
                    team1: "OG",
                    team2: "Spanish",
                    score: [0, 2],
                    done: true
                },
                team2: {
                    team1: "The greeks",
                    team2: "Boys in blue",
                    score: [1, 2],
                    done: true
                },
                score: [0, 0],
                done: false
            },
            score: [0, 0],
            done: false
        };

        return <Bracket bracket={bracketData} />
    });
