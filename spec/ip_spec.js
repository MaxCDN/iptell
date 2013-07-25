var suite = require('./suite');


suite('GET ip', 'ip')
    .expectStatus(200)
    .expectJSONTypes({
        ip: String
    })
    .expectJSON({
        ip: '127.0.0.1'
    })
    .toss();