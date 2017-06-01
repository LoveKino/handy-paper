'use strict';

let {
    n, view
} = require('kabanery');

let {
    m
} = require('kabanery-flow');

let {
    getPaperApiPath, savePaperApiPath
} = require('../../../config');

let PaperView = require('../view/paperView');

let OpSpace = require('../view/opSpace');

/**
 * value = {
 *  paperData
 * }
 */
let PaperPage = view(({
    value, onchange, savePaper
}) => {
    return m('div', {
        style: {
            width: '100%',
            height: '100%'
        },
        value,
        onchange
    }, (bindValue) => [
        PaperView(bindValue('paperData')),

        n('div', {
            style: {
                position: 'fixed',
                left: 0,
                top: 0
            }
        }, [
            OpSpace({
                save: () => savePaper(value.paperData)
            })
        ])
    ]);
});

module.exports = () => {
    return fetch(getPaperApiPath).then((response) => {
        return response.json();
    }).then((paperData) => {
        return PaperPage({
            value: {
                paperData: JSON.parse(paperData.data)
            },

            savePaper: (v) => {
                fetch(savePaperApiPath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(v)
                });
            }
        });
    });
};
