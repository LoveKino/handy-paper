'use strict';

let {
    view, n
} = require('kabanery');

let {
    RawInput, m
} = require('kabanery-flow');

let uuidV4 = require('uuid/v4');

let {
    map
} = require('bolzano');

/**
 *
 * data = {
 *   recordMap: {},
 *   records: [id]
 * }
 */
module.exports = view(({
    recordMap,
    records
}, {
    update
}) => {
    let addRecord = (x, y) => {
        let startId = uuidV4();

        records.push(startId);
        recordMap[startId] = {
            left: x,
            top: y,
            value: ''
        };
    };

    return () => n('div', {
        style: {
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(234, 212, 74, 1)',
            position: 'relative'
        },

        onclick: (e) => {
            let x = e.clientX;
            let y = e.clientY;

            addRecord(x, y);

            update();
        }
    }, [
        map(records, (id) => {
            let record = recordMap[id];

            return m('div', {
                value: record
            }, (bindValue) => [
                RawInput(bindValue('value', {
                    style: {
                        position: 'fixed',
                        left: record.left,
                        top: record.top
                    },

                    id,

                    onclick: (e) => {
                        e.stopPropagation();
                    }
                }))
            ]);
        })
    ]);
});
