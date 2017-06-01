#!/usr/bin/env node

'use strict';

let {
    handypaper
} = require('..');

let yargs = require('yargs');
let path = require('path');

yargs.usage(`Usage: $0
    -p [port, default is 8000]
    -s [storage dir]
    `).demandOption([]).help('h').alias('h', 'help');

let {
    argv
} = yargs;

handypaper({
    port: argv.p,
    storageDir: path.join(process.cwd(), argv.s || '')
});
