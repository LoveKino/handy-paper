'use strict';

let path = require('path');
let crude = require('crude-server');
let mime = require('mime-types');
let {
    createReadStream
} = require('fs');

module.exports = ({
    savePaperApiPath,
    getPaperApiPath,
    publicDir
}) => {
    return crude((pathname) => {
        if (pathname === '/') {
            return (req, res) => {
                res.setHeader('Content-Type', 'html');
                createReadStream(path.join(publicDir, 'index.html')).pipe(res);
            };
        } else if (pathname === getPaperApiPath) {
            return (req, res) => {
                res.end(JSON.stringify({
                    errno: 0,
                    data: {
                        recordMap: {},
                        records: []
                    }
                }));
            };
        } else if (pathname === savePaperApiPath) {
            return (req, res) => {
                let str = '';
                req.on('data', (chunk) => {
                    str += chunk.toString();
                });

                req.on('end', () => {
                    let data = JSON.parse(str);

                    // TODO save data
                    res.end(JSON.stringify({
                        errno: 0
                    }));
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
