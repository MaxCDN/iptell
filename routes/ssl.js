var ssl = require('../utils').ssl;
var certs = require('../scripts/ca2json/cacert.json');


module.exports = {
    get: function(request, response) {
        var query = request.query;

        if(query.host) {
            ssl.connect(query.host, function(err, d) {
                if(err) return response.send(400);

                response.json(d);
            });
        }
        else if(query.name) {
            var cert = findCert(query.name);

            if(cert) response.json(cert);
            else response.send(400);
        }
        else response.send(400);
    }
};

function findCert(name) {
    var cert;

    for(var i = 0, len = certs.length; i < len; i++) {
        cert = certs[i];

        if(cert.subject.organizationalUnitName == name) return cert;
    }
}
