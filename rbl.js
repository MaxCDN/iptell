var dns = require('dns');


function blacklisted(targets, ip, cb) {
    var target = 'bl.spamcop.net';

    // TODO: map targets

    dns.resolve(reverseIp(ip) + '.' + target, function(err, data) {
        if(err) {
            if(err.errno == 'ENOTFOUND') return cb(null, false);
            else return cb(err);
        }

        cb(null, true);
    });
}
module.exports = blacklisted;

function reverseIp(ip) {
    return ip.split('.').reverse().join('.');
}
