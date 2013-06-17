// based on https://github.com/jawsome/node-dnsbl
module.exports = [
    {name: 'SpamCop', dns: 'bl.spamcop.net'},
    {name: 'Sorbs Aggregate Zone', dns: 'dnsbl.sorbs.net'},
    {name: 'Sorbs spam.dnsbl Zone', dns: 'spam.dnsbl.sorbs.net'},
    {name: 'Composite Blocking List', dns: 'cbl.abuseat.org'},
    {name: 'SpamHaus Zen', dns: 'zen.spamhaus.org'},
    {name: 'Multi SURBL', dns: 'multi.surbl.org'},
    {name: 'Spam Cannibal', dns: 'bl.spamcannibal.org'},
    {name: 'dnsbl.abuse.ch', dns: 'spam.abuse.ch'},
    {name: 'The Unsubscribe Blacklist', dns: 'ubl.unsubscore.com'},
    {name: 'UCEPROTECT Network', dns: 'dnsbl-1.uceprotect.net'}
];
