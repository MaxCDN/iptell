var suite = require('./suite');
var rbls = require('../config/rbls');

delete rbls[rbls.length - 1];

getBlacklisted('127.0.0.1', []);
getBlacklisted('foobar', []);
getBlacklisted('127.0.0.2', rbls);

function getBlacklisted(ip, result) {
    suite('GET blacklisted status for ' + ip, 'blacklisted/' + ip)
        .expectStatus(200)
        .expectJSON(result)
        .toss();
}