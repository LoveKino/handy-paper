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
            position: 'fixed',
            left: value.left,
            top: value.top
        }
    }, (bindValue) => [
        RawTextArea(bindValue('value', {
            id,

            onclick: (e) => {
                e.stopPropagation();
            }
        }))
    ]);
});
