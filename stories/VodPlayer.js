import React from 'react';
import { storiesOf } from '@storybook/react';

import VodPlayer from "../src/components/VodPlayer";

const playerHeight = 480;
const playerWidth = Math.ceil(playerHeight * (16/9));

storiesOf('VodPlayer', module)
    .add('Alliance vs Na`Vi', () => {
        const videoId = "2zsNnwtVH_I";
        const start = 971;

        return <VodPlayer videoId={videoId} width={playerWidth} height={playerHeight} start={start} />;
    })
    .add('Ads test', () => {
        const videoId = "9S9IypwaZ9U";

        return <VodPlayer videoId={videoId} width={playerWidth} height={playerHeight} />;
    });
