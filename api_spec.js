#!/usr/bin/env node
var frisby = require('frisby');


var URL = 'http://localhost:8000/v1/';

tests();

function tests() {
    getLocation('host', 'host=google-public-dns-a.google.com', 200, 'Google');
    getLocation('faulty host', 'host=foobar', 400);
    getLocation('ip', 'ip=8.8.8.8', 200, 'Google');
    getLocation('faulty ip', 'ip=foobar', 400);
    getIp();
    getBlacklisted('127.0.0.1', []);
    getBlacklisted('foobar', []);
    // TODO: figure out how to test "positive" case for rbls
}

function getLocation(name, query, status, result) {
    var f = frisby.create('GET location for ' + name)
        .get(URL + 'location?' + query)
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

function getIp() {
    frisby.create('GET ip')
        .get(URL + 'ip')
        .expectStatus(200)
        .expectJSONTypes({
            ip: String
        })
        .expectJSON({
            ip: '127.0.0.1'
        })
        .toss();
}

function getBlacklisted(ip, result) {
    frisby.create('GET blacklisted status for ' + ip)
        .get(URL + 'blacklisted/' + ip)
        .expectStatus(200)
        .expectJSON(result)
        .toss();
}
