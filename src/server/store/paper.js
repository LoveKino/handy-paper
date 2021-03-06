'use strict';

let fs = require('fs');
let promisify = require('es6-promisify');

let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);
let stat = promisify(fs.stat);

let existsFile = (filePath) => {
    return new Promise((resolve) => {
        stat(filePath).then((statObj) => {
            resolve(statObj.isFile());
        }).catch(() => {
            resolve(false);
        });
    });
};

let save = (filePath, paper) => {
    // TODO check data format
    return writeFile(filePath, JSON.stringify(paper), 'utf-8');
};

let get = (filePath) => {
    return existsFile(filePath).then((has) => {
        if (!has) {
            return writeFile(filePath, JSON.stringify({
                records: [],
                recordMap: {}
            }), 'utf-8');
        }
    }).then(() => {
        return readFile(filePath, 'utf-8').then((str) => {
            return JSON.parse(str);
        });
    });
};

module.exports = {
    save,
    get
};
