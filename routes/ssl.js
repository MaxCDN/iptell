var ssl = require('../ssl');


module.exports = {
    get: function(request, response) {
        var host = request.params.host;

        ssl.connect(host, function(err, d) {
            if(err) return response.send(400);

            response.json(d);
        })
    }
};