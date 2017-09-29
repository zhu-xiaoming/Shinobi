var crypto = require('crypto');
var moment = require('moment');

function toLong(ip) {
    var ipl = 0;
    ip.split('.').forEach(function(octet) {
        ipl <<= 8;
        ipl += parseInt(octet);
    });
    return ipl >>> 0;
}

function gcd(a,b)
{
    if ( ! b) {
        return a;
    }
    return gcd(b, a % b);
}

module.exports = {
    toLong,
    md5(x) {
        return crypto
            .createHash('md5')
            .update(x)
            .digest('hex');
    },
    nameToTime(x) {
        (x = x.split('.')[0].split('T')), (x[1] = x[1].replace(/-/g, ':'));
        x = x.join(' ');
        return x;
    },
    ratio(width, height, ratio) {
        var divisor = gcd(height, width);
        return height/divisor + ':' + width/divisor;
    },
    gid(x) {
        if (!x) {
            x = 10;
        }
        var t = '';
        var p =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < x; i++)
            t += p.charAt(Math.floor(Math.random() * p.length));
        return t;
    },
    moment_withOffset(e, x) {
        if (!e) {
            e = new Date();
        }
        if (!x) {
            x = 'YYYY-MM-DDTHH-mm-ss';
        }
        e = moment(e);
        if (config.utcOffset) {
            e = e.utcOffset(config.utcOffset);
        }
        return e.format(x);
    },
    moment(e, x) {
        if (!e) {
            e = new Date();
        }
        if (!x) {
            x = 'YYYY-MM-DDTHH-mm-ss';
        }
        return moment(e).format(x);
    },
    ipRange(start_ip, end_ip) {
        var start_long = toLong(start_ip);
        var end_long = toLong(end_ip);
        if (start_long > end_long) {
            var tmp = start_long;
            start_long = end_long;
            end_long = tmp;
        }
        var range_array = [];
        var i;
        for (i = start_long; i <= end_long; i++) {
            range_array.push(s.fromLong(i));
        }
        return range_array;
    },
    portRange(lowEnd, highEnd) {
        var list = [];
        for (var i = lowEnd; i <= highEnd; i++) {
            list.push(i);
        }
        return list;
    },
    fromLong(ipl) {
        return (
            (ipl >>> 24) +
            '.' +
            ((ipl >> 16) & 255) +
            '.' +
            ((ipl >> 8) & 255) +
            '.' +
            (ipl & 255)
        );
    },
};
