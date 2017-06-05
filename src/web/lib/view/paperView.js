'use strict';

let {
    view
} = require('kabanery');

let {
    m
} = require('kabanery-flow');

let {
    map
} = require('bolzano');

let RecordView = require('./recordView');

let {
    addRecord
} = require('../model/paper');
/**
 *
 * data = {
 *   value: {recordMap: {}, records: [id]}
 * }
 */
module.exports = view(({
    value,
    onchange
}, {
    update
}) => {
    return () => m('div', {
        style: {
            width: '100%',
            height: '100%',
            //            backgroundColor: 'rgba(234, 212, 174, 1)',
            position: 'relative'
        },
        value,
        onchange,

        onclick: (e) => {
            let x = e.clientX;
            let y = e.clientY;

            addRecord(value, x, y);

            update();
        }
    }, (bindValue) => [
        map(value.records, (id) => {
            return RecordView(bindValue(`recordMap.${id}`, {
                id
            }));
        })
    ]);
});
