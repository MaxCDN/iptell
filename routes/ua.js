var parse = require('user-agent-parse').parse;


module.exports = {
    get: function(request, response) {
        var ua = request.params.ua;
        var result = parse(ua);

        if(result.name) response.json(parse(ua));
        else response.send(400);
    }
};
