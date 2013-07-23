var config = require('../config');
var rbl = require('../utils').rbl;


module.exports = {
    get: function(request, response) {
        var ip = request.params.ip;

        if(!ip) return response.send(400);

        rbl(ip, config.rbls, function(err, blacklisted) {
            if(err) return response.send(400);

            response.json(blacklisted);
        });
    }
};
