var providers = {
    'Amazon': 'http://www.amazon.com/favicon.ico',
    'Unified Layer': 'http://www.bluehost.com/favicon.ico'
    // TODO: add more
};

// TODO: consider caching the favicons somehow

module.exports = function(provider) {
    return providers[provider];
};
