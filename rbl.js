var dns = require('dns');

var async = require('async');


module.exports = blacklistedTargets;

function blacklistedTargets(ip, targets, cb) {
    async.map(targets, blacklistedTarget.bind(undefined, ip), function(err, data) {
        if(err) return cb(err);

        cb(null, data.filter(id));
    });
}

function blacklistedTarget(ip, target, cb) {
    dns.resolve(reverseIp(ip) + '.' + target.dns, function(err, data) {
        if(err) {
            // errors in case there is no match or the service is down
            return cb(null);
        }

        cb(null, target);
    });
}

function reverseIp(ip) {
    return ip.split('.').reverse().join('.');
}

function id(a) {return a;}
