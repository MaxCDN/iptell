var config;

try {
    config = require('./config');
}
catch(e) {
    var env = process.env;

    config = {
        port: env.PORT || 8000,
        geoipcity: env.GEOIPCITY
    };
}

module.exports = config;
