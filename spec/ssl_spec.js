var suite = require('./suite');
var cert = require('../scripts/ca2json/cacert.json')[0];


getSsl('host', 'host=google.com', 200);
getSsl('faulty host', 'host=foobar', 400);
getSsl('name', 'name=' + cert.subject.organizationalUnitName, 200, cert);
getSsl('faulty name', 'name=foobar', 400);
getSsl('fail', 'fail=foobar', 400);

function getSsl(name, query, status, result) {
    var f = suite('GET ssl for ' + name, 'ssl?' + query)
        .expectStatus(status);

    if(result) f.expectJSON(result);

    f.toss();
}
