var suite = require('./suite');


getLocation('host', 'host=google-public-dns-a.google.com', 200, 'Google');
getLocation('faulty host', 'host=foobar', 400);
getLocation('ip', 'ip=8.8.8.8', 200, 'Google');
getLocation('faulty ip', 'ip=foobar', 400);
getLocation('fail', 'fail=foobar', 400);

function getLocation(name, query, status, result) {
    var f = suite('GET location for ' + name, 'location?' + query)
        .expectStatus(status);

    if(result) {
        f.expectJSONTypes({
            location: String
        })
        .expectJSON({
            location: result
        });
   }

   f.toss();
}
