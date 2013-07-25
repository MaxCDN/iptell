var suite = require('./suite');


getBlacklisted('127.0.0.1', []);
getBlacklisted('foobar', []);
// TODO: test positive case with 127.0.0.2

function getBlacklisted(ip, result) {
    suite('GET blacklisted status for ' + ip, 'blacklisted/' + ip)
        .expectStatus(200)
        .expectJSON(result)
        .toss();
}