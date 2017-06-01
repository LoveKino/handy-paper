'use strict';

let {
    view
} = require('kabanery');
let {
    m, RawTextArea
} = require('kabanery-flow');

module.exports = view(({
    value,
    onchange,
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
