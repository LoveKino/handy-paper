'use strict';

let {
    RawTextArea
} = require('kabanery-flow');

let {
    view
} = require('kabanery');

module.exports = view(({
    value, onchange, height = 'auto'
}, {
    getNode
}) => {
    let resize = () => {
        let node = getNode();
        node.style.height = 'auto';
        node.style.height = node.scrollHeight + 'px';
    };

    // TODO on mount event
    setTimeout(() => {
        resize();
    }, 17);

    return RawTextArea({
        onchange: (v) => {
            onchange && onchange(v);
            resize();
        },

        value,

        style: {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            fontSize: 20,
            height
        }
    });
});
