var providers = {
    'Amazon Web Services': 'http://aws.amazon.com/favicon.ico',
    'Bluehost': 'http://www.bluehost.com/favicon.ico',
    'DigitalOcean': 'http://www.digitalocean.com/favicon.ico',
    'DreamHost': 'http://www.dreamhost.com/favicon.ico',
    'Linode': 'https://www.linode.com/favicon.ico',
    'Liquidweb': 'https://www.liquidweb.com/favicon.ico',
    'GoDaddy': 'https://www.godaddy.com/favicon.ico',
    'Google App Engine': 'https://cloud.google.com/_static/images/favicon.ico',
    'VPS.net': 'https://www.vps.net/favicon.ico',
    'Zerolag': 'https://www.zerolag.com/favicon.ico',
    'Internap': 'https://www.internap.com/favicon.ico',
    'Peer1 Hosting': 'https://www.peer1.com/favicon.ico',
    'Yahoo Small Business': 'http://smallbusiness.yahoo.com/favicon.ico',
    'HostGator': 'https://www.hostgator.com/favicon.ico',
    'Laughing Squid': 'https://www.laughingsquid.us/favicon.ico',
    'SiteGround': 'https://www.siteground.com/favicon.ico',
    'Media Temple': 'https://www.mediatemple.net/favicon.ico',
    'Web.com': 'https://www.web.com/favicon.ico',
    'Fatcow': 'https://www.fatcow.com/favicon.ico',
    'iPage': 'https://www.ipage.com/favicon.ico',
    'InMotion': 'https://www.inmotion.com/favicon.ico',
    'HostMonster': 'https://www.hostmonster.com/favicon.ico',
    'Network Solutions': 'https://www.networksolutions.com/favicon.ico',
    'Windows Azure': 'https://www.windowsazure.com/favicon.ico',
    'Rackspace': 'https://www.rackspace.com/favicon.ico',
    'Heroku': 'http://d4yt8xl9b7in.cloudfront.net/assets/favicon-ec1c49d2d16026c03484fa43c0d3a237.ico',
    '1&1': 'http://www.1and1.com/favicon.ico',
    'Softlayer': 'http://www.softlayer.com/favicon.ico',
    'SingleHop': 'http://www.singlehop.com/favicon.ico'
    // TODO: add more &&:
	// Proxy the icons to MaxCDN so there are no Mixed Content and SSL Security warnings
};

// TODO: consider caching the favicons somehow

module.exports = function(provider) {
    return providers[provider];
};
