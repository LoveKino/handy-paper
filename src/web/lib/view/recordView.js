'use strict';

let {
    view, n
} = require('kabanery');
let {
    m
} = require('kabanery-flow');

let RawText = require('./text/rawText');

module.exports = view(({
    value,
    onchange,
    ondelete,
    id
}) => {
    return m('div', {
        onclick: (e) => {
            e.stopPropagation();
        },
        value,
        onchange,

        style: {
            position: 'absolute',
            left: value.left,
            top: value.top,
            width: '40%'
        }
    }, (bindValue) => [
        n('div', {
        }, [
            n('div', {
                style: {
                    cursor: 'pointer',
                    position: 'relative'
                },

                onclick: (e) => {
                    e.stopPropagation();
                    ondelete && ondelete(id);
                }
            }, 'x')
        ]),

        RawText(bindValue('value', {
            style: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                fontSize: 20
            },

            onclick: (e) => {
                e.stopPropagation();
            }
        }))
    ]);
});
