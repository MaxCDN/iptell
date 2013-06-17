#!/bin/env node
var express = require('express');
var geoip = require('geoipcity');

var dns = require('dns');

var config = require('./config');
var favicon = require('./favicon');


geoip.settings.license = config.geoipcity;

serve();

function serve(err) {
    if(err) return console.error(err);

    var prefix = 'v1';

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

    app.get( '/' + prefix + '/location', function(request, response) {
        var query = request.query;

        if(query.host) {
            hostLookup(query.host, function(err, d) {
                return geoResponse(err? query.ip: d[0]);
            });
        }
        else if(query.ip) geoResponse(query.ip);
        else response.send(400);

        function geoResponse(ip) {
            geoLookup(ip, function(err, d) {
                if(err) return response.send(400);

                response.json({
                    location: d,
                    favicon: favicon(d)
                });
            });
        }
    });

    app.get('/' + prefix + '/ip', function(request, response) {
        var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        if(!ip) return response.send(400);

        response.json({
            ip: ip
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

function hostLookup(host, cb) {
    if(!host) return cb('No host provided!');

    dns.resolve(host, cb);
}

function geoLookup(ip, cb) {
    if(!ip) return cb('No ip provided!');

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
