var dns = require('dns');


module.exports = hostLookup;

function hostLookup(host, cb) {
    if(!host) return cb('No host provided!');

    dns.resolve(host, cb);
}