var parseEnv = require('parse-env');

var configTemplate = require('./config.template');
var config;

try {
    config = require('./config');
}
catch(e) {}

config = parseEnv(process.env, configTemplate, config);

config.rbls = require('./rbls');

module.exports = config;
