var openssl = require('openssl-wrapper');

exports.connect = connect;

function connect(host, cb) {
    console.log(host + ':443')
    openssl.exec('s_client', {connect: host + ':443'}, function(err, buffer) {
        var d = buffer.toString();

        d = [d];

        // TODO: parse data now
        if(d) return cb(null, d);

        cb(err);
    })
}