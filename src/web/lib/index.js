'use strict';

require('whatwg-fetch');

let {
    router, queryPager
} = require('kabanery-spa');

let paper = require('./page/paper');

let ajaxCaller = require('general-bridge/apply/http/ajax');

let call = ajaxCaller('/api');

let {
    forward
} = router(queryPager({
    'paper': {
        render: paper,
        title: 'paper'
    }
}, 'paper'), {
    call
});

forward(window.location.href);
