var providers = {
    'Amazon Web Services': 'http://aws.amazon.com/favicon.ico',
    'Bluehost': 'http://www.bluehost.com/favicon.ico',
    'DigitalOcean': 'http://www.digitalocean.com/favicon.ico',
    'Softlayer': 'http://www.softlayer.com/favicon.ico',
    'SingleHop': 'http://www.singlehop.com/favicon.ico'
    // TODO: add more
};

// TODO: consider caching the favicons somehow

module.exports = function(provider) {
    return providers[provider];
};
