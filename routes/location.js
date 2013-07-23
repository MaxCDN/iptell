var config = require('../config');
var geo = require('../geo')(config.geoipcity);
var host = require('../host');


module.exports = {
    get: function(request, response) {
        var query = request.query;

        if(query.host) {
            host(query.host, function(err, d) {
                return geo(response, err? query.ip: d[0]);
            });
        }
        else if(query.ip) geo(response, query.ip);
        else response.send(400);
    }
};