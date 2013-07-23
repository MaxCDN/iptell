var geoip = require('geoipcity');

var config = require('./config');
var favicon = require('./favicon');


module.exports = function(license) {
    geoip.settings.license = license;

    return geoResponse;
};

function geoResponse(response, ip) {
    geoLookup(ip, function(err, d) {
        if(err) return response.send(400);

        response.json({
            location: d,
            favicon: favicon(d)
        });
    });
}

function geoLookup(ip, cb) {
    if(!ip) return cb('No ip provided!');

    geoip.lookup(ip, function(err, data) {
        if(err) return cb(err);

        cb(null, data.org);
    });
}