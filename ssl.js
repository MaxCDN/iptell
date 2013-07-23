var fs = require('fs');
var extend = require('util')._extend;

var async = require('async');
var openssl = require('openssl-wrapper');
var request = require('request');
var temp = require('temp');
var x509 = require('x509');


exports.connect = connect;

function connect(host, cb) {
    openssl.exec('s_client', {connect: host + ':443'}, function(err, buffer) {
        var d = buffer.toString().split('\n---\n').filter(id);

        if(d) {
            async.map([
                server,
                certificateChain,
                certificate,
                info
            ], function(fn, cb) {
                fn(host, d, cb);
            }, function(err, d) {
                cb(err, toObject(d));
            });
        }
    })
}

function toObject(arr) {
    var ret = arr.shift();

    arr.forEach(function(v) {
        ret = extend(ret, v);
    });

    return ret;
}

function server(host, d, cb) {
    request('http://' + host, function(err, response) {
        if(err) return cb(err);

        cb(null, {
            server: response.headers.server
        });
    })
}

function certificateChain(host, d, cb) {
    var ret = [];

    d[1].split('\n').slice(1).forEach(function(v) {
        var parts = v.split('s:');

        if(parts.length >= 2) {
            var p = parts.slice(1).join('');

            if(ret.indexOf(p) == -1) ret.push(p);
        }
        else {
            ret.push(v.split('i:').slice(1).join(''));
        }
    });

    cb(null, {
        chain: ret
    });
}

function certificate(host, d, cb) {
    var parts = d[2].split('\n');
    var certData = parts.slice(1, parts.length - 2).join('\n');

    temp.open('cert', function(err, cert) {
        if(err) return cb(err);

        fs.writeFile(cert.path, certData, function(err) {
            if(err) return cb(err);

            fs.close(cert.fd, function(err) {
                cb(null, {
                    certificate: x509.parseCert(cert.path)
                });
            });
        })
    });
}

function info(host, d, cb) {
    var ret = d[d.length - 1].split('SSL-Session:')[0].split('\n');

    cb(null, {
        info: {
            'type': ret[0].split(',')[1].trim(),
            key: ret[1].split(' is ')[1].trim(),
            compression: ret[3].split(':')[1].trim(),
            expansion: ret[4].split(':')[1].trim()
        }
    });
}

function id(a) {return a;}