'use strict';

let path = require('path');
let crude = require('crude-server');
let mime = require('mime-types');
let {
    midder
} = require('general-bridge/apply/http');
let {
    createReadStream
} = require('fs');
let PaperStore = require('./store/paper');

let getPaperPath = (storageDir) => {
    let paperPath = path.join(storageDir, 'files/index.json');
    return paperPath;
};

module.exports = ({
    publicDir,
    storageDir
}) => {
    return crude((pathname) => {
        if (pathname === '/') {
            return (req, res) => {
                res.setHeader('Content-Type', 'html');
                createReadStream(path.join(publicDir, 'index.html')).pipe(res);
            };
        } else if (pathname === '/api') {
            return (req, res) => {
                let paperPath = getPaperPath(storageDir);

                let mid = midder({
                    getPaper: () => {
                        return PaperStore.get(paperPath);
                    },

                    savePaper: (paper) => {
                        return PaperStore.save(paperPath, paper);
                    }
                });

                let chunks = [];
                req.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                req.on('end', () => {
                    mid(chunks.join(''), res);
                });
            };
        } else if (/^\/public/.test(pathname)) { // just pipe static file
            return (req, res) => {
                res.setHeader('Content-Type', mime.lookup(pathname));
                // TODO cache headers
                createReadStream(path.join(publicDir, pathname.substring(1))).pipe(res);
            };
        }
    });
};
