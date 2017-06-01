'use strict';

let {
    view, n
} = require('kabanery');

let id = v => v;

module.exports = view(({
    save,
    lang = id
}) => {
    return n('div', [
        n('button', {
            onclick: () => {
                save();
            }
        }, lang('save'))
    ]);
});
