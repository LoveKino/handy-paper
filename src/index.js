'use strict';

let Server = require('./server');
let path = require('path');
let openPage = require('./util/openPage');
let {
    savePaperApiPath, getPaperApiPath
} = require('./config');

let log = console.log; // eslint-disable-line

/**
 * I need handy paper to write down something sometime. I do not like current tools, I need a more powerful but more handy tool. I do not want to learn anything, I just want to write my ideas down as quick as possible.
 */

const publicDir = path.join(__dirname, './web');

let handypaper = ({
    port = 8000
} = {}) => {
    let {
        start
    } = Server({
        savePaperApiPath,
        getPaperApiPath,
        publicDir
    });

    return start(port).then(({
        port
    }) => {
        log(`paper server start at ${port}`);
        return openPage(`http://127.0.0.1:${port}`);
    });
};

module.exports = {
    handypaper
};
