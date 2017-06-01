'use strict';

let {
    view
} = require('kabanery');

let {
    m
} = require('kabanery-flow');

let uuidV4 = require('uuid/v4');

let {
    map
} = require('bolzano');

let RecordView = require('./recordView');

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
    let {
        recordMap,
        records
    } = value;

    let addRecord = (x, y) => {
        let startId = uuidV4();

        records.push(startId);
        recordMap[startId] = {
            left: x,
            top: y,
            value: ''
        };
    };

    return () => m('div', {
        style: {
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(234, 212, 74, 1)',
            position: 'relative'
        },
        value,
        onchange,

        onclick: (e) => {
            let x = e.clientX;
            let y = e.clientY;

            addRecord(x, y);

            update();
        }
    }, (bindValue) => [
        map(records, (id) => {
            return RecordView(bindValue(`recordMap.${id}`, {
                id
            }));
        })
    ]);
});
