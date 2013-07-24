#!/usr/bin/env node
var fs = require('fs');
var VERSION = require('./package.json').version;

var program = require('commander');
var async = require('async');
var x509 = require('x509');


main();

function main() {
    program.
        version(VERSION).
        option('-i --input <input>', 'input file').
        option('-o --output <output>', 'output file (json)').
        parse(process.argv);

    if(!program.input) return console.error('missing input');
    if(!program.output) return console.error('missing output');

    var data = fs.readFileSync(program.input, {encoding: 'utf-8'}).split('\n\n').
        filter(not(startsWith.bind(null, '#')));

    async.map(data, function(d, cb) {
        cb(null, x509.parseCert(d));
    }, function(err, d) {
        if(err) return console.error(err);

        fs.writeFileSync(program.output, JSON.stringify(d));
    });
}

function not(fn) {
    return function(v) {
        return !fn(v);
    };
}

function startsWith(val, a) {
    return a.indexOf(val) === 0;
}
