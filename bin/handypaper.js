#!/usr/bin/env node

'use strict';

let {
    handypaper
} = require('..');

let yargs = require('yargs');

yargs.usage(`Usage: $0
    -p [port, default is 8000]
    `).demandOption([]).help('h').alias('h', 'help');

let {
    argv
} = yargs;

handypaper({
    port: argv.port
});
