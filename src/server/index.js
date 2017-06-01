'use strict';

let path = require('path');
let crude = require('crude-server');
let mime = require('mime-types');
let {
    createReadStream
} = require('fs');
let PaperStore = require('./store/paper');

module.exports = ({
    savePaperApiPath,
    getPaperApiPath,
    publicDir,
    storageDir
}) => {
    let paperPath = path.join(storageDir, 'index.json');

    return crude((pathname) => {
        if (pathname === '/') {
            return (req, res) => {
                res.setHeader('Content-Type', 'html');
                createReadStream(path.join(publicDir, 'index.html')).pipe(res);
            };
        } else if (pathname === getPaperApiPath) {
            return (req, res) => {
                PaperStore.get(paperPath).then((data) => {
                    res.end(JSON.stringify({
                        errno: 0,
                        data
                    }));
                }).catch(err => {
                    res.end(JSON.stringify({
                        errno: 'paperStore.get',
                        errorMsg: err.toString()
                    }));
                });
            };
        } else if (pathname === savePaperApiPath) {
            return (req, res) => {
                let str = '';
                req.on('data', (chunk) => {
                    str += chunk.toString();
                });

                req.on('end', () => {
                    PaperStore.save(paperPath, str).then(() => {
                        res.end(JSON.stringify({
                            errno: 0
                        }));
                    }).catch(err => {
                        res.end(JSON.stringify({
                            errno: 'paperStore.save',
                            errorMsg: err.toString()
                        }));
                    });
                });
            };
        } else if (/^\/public/.test(pathname)) {
            return (req, res) => { // just pipe static file
                res.setHeader('Content-Type', mime.lookup(pathname));
                createReadStream(path.join(publicDir, pathname.substring(1))).pipe(res);
            };
        }
    });
};
