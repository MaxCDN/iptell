var frisby = require('frisby');

module.exports = function(name, url) {
    var root = 'http://localhost:8000/v1/';

    return frisby.create(name).get(root + url);
};
