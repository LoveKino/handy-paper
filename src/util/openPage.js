'use strict';

let {
    spawn
} = require('child_process');

module.exports = (pageUrl, {
    appPath
} = {}) => {
    if (appPath) {
        return isWindow() ? spawn(appPath, [pageUrl]) : spawn('open', ['-a', appPath, pageUrl]);
    }
    return isWindow() ? spawn('start', [pageUrl]) : spawn('open', [pageUrl]);
};

let isWindow = () => process.platform === 'win32';
