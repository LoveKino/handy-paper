'use strict';

let {
    view, n
} = require('kabanery');
let {
    m, RawTextArea
} = require('kabanery-flow');

module.exports = view(({
    value,
    onchange,
    ondelete,
    id
}) => {
    return m('div', {
        value,
        onchange,

        style: {
            position: 'absolute',
            left: value.left,
            top: value.top
        }
    }, (bindValue) => [
        n('div', {
            style: {
                cursor: 'pointer'
            },

            onclick: (e) => {
                e.stopPropagation();
                ondelete && ondelete(id);
            }
        }, 'x'),

        RawTextArea(bindValue('value', {
            style: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                fontSize: 20
            },

            id,
            onclick: (e) => {
                e.stopPropagation();
            }
        }))
    ]);
});
