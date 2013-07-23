#!/usr/bin/env node
var express = require('express');
var geoip = require('geoipcity');

var dns = require('dns');

var config = require('./config');
var rbl = require('./rbl');
var geo = require('./geo')(config.geoipcity);



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
                return geo(response, err? query.ip: d[0]);
            });
        }
        else if(query.ip) geo(response, query.ip);
        else response.send(400);
    });

    app.get('/' + prefix + '/ip', function(request, response) {
        var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        if(!ip) return response.send(400);

        response.json({
            ip: ip
        });
    });

    app.get('/' + prefix + '/blacklisted/:ip', function(request, response) {
        var ip = request.params.ip;

        if(!ip) return response.send(400);

        rbl(ip, config.rbls, function(err, blacklisted) {
            if(err) return response.send(400);

            response.json(blacklisted);
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

function terminator(sig) {
    if(typeof sig === "string") {
        console.log('%s: Received %s - terminating Node server ...',
            Date(Date.now()), sig);

        process.exit(1);
    }

    console.log('%s: Node server stopped.', Date(Date.now()) );
}
