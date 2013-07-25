var suite = require('./suite');
var rbls = require('../config/rbls');

delete rbls[rbls.length - 1];


var noResults = {message: 'No blacklist entries were found'};

getBlacklisted('127.0.0.1', noResults);
getBlacklisted('foobar', noResults);
getBlacklisted('127.0.0.2', rbls);

function getBlacklisted(ip, result) {
    suite('GET blacklisted status for ' + ip, 'blacklisted/' + ip)
        .expectStatus(200)
        .expectJSON(result)
        .toss();
}