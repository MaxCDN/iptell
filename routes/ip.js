module.exports = {
    get: function(request, response) {
        var ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

        if(!ip) return response.send(400);

        response.json({
            ip: ip
        });
    }
};