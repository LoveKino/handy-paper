'use strict';

require('whatwg-fetch');

let {
    router, queryPager
} = require('kabanery-spa');

let paper = require('./page/paper');

let {
    forward
} = router(queryPager({
    'paper': {
        render: paper,
        title: 'paper'
    }
}, 'paper'));

forward(window.location.href);
