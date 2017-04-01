import { configure } from '@kadira/storybook';

const requireStory = require.context("../stories", true, /\.js$/);

function loadStories() {
    //requireStory.keys() has all .js files in "../stories"
    requireStory.keys().forEach(fileName => requireStory(fileName));
}

configure(loadStories, module);
