#!/bin/env node
var express = require('express');
var geoip = require('geoipcity');

var config = require('./config');
var favicon = require('./favicon');


geoip.settings.license = config.geoipcity;

serve();

function serve(err) {
    if(err) return console.error(err);

    var app = express();

    app.configure(function() {
        app.set('port', config.port);

        app.use(express.favicon());
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        app.use(app.router);
    });

    app.configure('development', function() {
        app.use(express.errorHandler());
    });

    app.get('/location', function(request, response) {
        geoLookup(request.query.ip, function(err, d) {
            if(err) return response.send(400);

            response.json({
                location: d,
                favicon: favicon(d)
            });
        });
    });
    process.on('exit', terminator);

    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT', 'SIGBUS',
    'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGPIPE', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() { terminator(element); });
    });

    var port = config.port;
    app.listen(port, function() {
        console.log('%s: Node (version: %s) %s started on %d ...', Date(Date.now() ), process.version, process.argv[1], port);
    });
}

function geoLookup(ip, cb) {
    if(!ip) return;

    geoip.lookup(ip, function(err, data) {
        if(err) return cb(err);

        cb(null, data.org);
    });
}

function terminator(sig) {
    if(typeof sig === "string") {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
