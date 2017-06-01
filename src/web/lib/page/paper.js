'use strict';

let {
    n
} = require('kabanery');

let {
    getPaperApiPath
} = require('../../../config');

let PaperView = require('../view/paperView');

module.exports = () => {
    return fetch(getPaperApiPath).then((response) => {
        return response.json();
    }).then((paperData) => {
        return n('div', {
            style: {
                width: '100%',
                height: '100%'
            }
        }, [
            PaperView({
                recordMap: {},
                records: []
            })
        ]);
    });
};
