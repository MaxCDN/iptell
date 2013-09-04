var qs = require('querystring');

var suite = require('./suite');
var cert = require('../scripts/ca2json/cacert.json')[0];


var chrome = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36';
var sleipnir = 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30618; .NET4.0C; .NET4.0E; Sleipnir/2.9.9)';

getUA('chrome', chrome, 200, {
    full: chrome,
    name: 'chrome',
    version: '29.0.1547.62',
    fullName: 'chrome 29.0.1547.62',
    os: 'OS X 10.8',
    device_type: 'desktop'
});
getUA('sleipnir', sleipnir, 200, {
    full: sleipnir,
    name: 'msie'
});
getUA('invalid', 'foobar', 400);

function getUA(name, ua, status, result) {
    var f = suite('GET user agent for ' + name, 'ua/' + qs.escape(ua))
        .expectStatus(status);

    if(result) f.expectJSON(result);

    f.toss();
}
