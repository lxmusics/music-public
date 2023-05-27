/**
 * @name lxmusics-source
 * @description 请合理使用
 * @version 1.0.1
 * @author lerdb & Folltoshe
 * @homepage https://github.com/lxmusics/music-public
 */

const { EVENT_NAMES, on, send, request, utils: lxUtils, version } = window.lx

const httpRequest = (url, options) =>
    new Promise((resolve, reject) => {
        request(url, options, (err, resp) => {
            if (err) return reject(err)
            resolve(resp.body)
        })
    })

// https://github.com/lerdb/kwDES
const encode = async (id, quality) => {
    var l = 7887891437440363641n;
    var Z = 4294967295n;
    var LsM = [0n, 1048577n, 3145731n];
    var ET = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
    var ST = [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n];
    var Ls = [1n, 1n, 2n, 2n, 2n, 2n, 2n, 2n, 1n, 2n, 2n, 2n, 2n, 2n, 2n, 1n];
    var P = [15n, 6n, 19n, 20n, 28n, 11n, 27n, 16n, 0n, 14n, 22n, 25n, 4n, 17n, 30n, 9n, 1n, 7n, 23n, 13n, 31n, 26n, 2n, 8n, 18n, 12n, 29n, 5n, 21n, 10n, 3n, 24n];
    var PC_1 = [56n, 48n, 40n, 32n, 24n, 16n, 8n, 0n, 57n, 49n, 41n, 33n, 25n, 17n, 9n, 1n, 58n, 50n, 42n, 34n, 26n, 18n, 10n, 2n, 59n, 51n, 43n, 35n, 62n, 54n, 46n, 38n, 30n, 22n, 14n, 6n, 61n, 53n, 45n, 37n, 29n, 21n, 13n, 5n, 60n, 52n, 44n, 36n, 28n, 20n, 12n, 4n, 27n, 19n, 11n, 3n];
    var E = [31n, 0n, 1n, 2n, 3n, 4n, -1n, -1n, 3n, 4n, 5n, 6n, 7n, 8n, -1n, -1n, 7n, 8n, 9n, 10n, 11n, 12n, -1n, -1n, 11n, 12n, 13n, 14n, 15n, 16n, -1n, -1n, 15n, 16n, 17n, 18n, 19n, 20n, -1n, -1n, 19n, 20n, 21n, 22n, 23n, 24n, -1n, -1n, 23n, 24n, 25n, 26n, 27n, 28n, -1n, -1n, 27n, 28n, 29n, 30n, 31n, 30n, -1n, -1n];
    var IP = [57n, 49n, 41n, 33n, 25n, 17n, 9n, 1n, 59n, 51n, 43n, 35n, 27n, 19n, 11n, 3n, 61n, 53n, 45n, 37n, 29n, 21n, 13n, 5n, 63n, 55n, 47n, 39n, 31n, 23n, 15n, 7n, 56n, 48n, 40n, 32n, 24n, 16n, 8n, 0n, 58n, 50n, 42n, 34n, 26n, 18n, 10n, 2n, 60n, 52n, 44n, 36n, 28n, 20n, 12n, 4n, 62n, 54n, 46n, 38n, 30n, 22n, 14n, 6n];
    var IP_1 = [39n, 7n, 47n, 15n, 55n, 23n, 63n, 31n, 38n, 6n, 46n, 14n, 54n, 22n, 62n, 30n, 37n, 5n, 45n, 13n, 53n, 21n, 61n, 29n, 36n, 4n, 44n, 12n, 52n, 20n, 60n, 28n, 35n, 3n, 43n, 11n, 51n, 19n, 59n, 27n, 34n, 2n, 42n, 10n, 50n, 18n, 58n, 26n, 33n, 1n, 41n, 9n, 49n, 17n, 57n, 25n, 32n, 0n, 40n, 8n, 48n, 16n, 56n, 24n];
    var PC_2 = [13n, 16n, 10n, 23n, 0n, 4n, -1n, -1n, 2n, 27n, 14n, 5n, 20n, 9n, -1n, -1n, 22n, 18n, 11n, 3n, 25n, 7n, -1n, -1n, 15n, 6n, 26n, 19n, 12n, 1n, -1n, -1n, 40n, 51n, 30n, 36n, 46n, 54n, -1n, -1n, 29n, 39n, 50n, 44n, 32n, 47n, -1n, -1n, 43n, 48n, 38n, 55n, 33n, 52n, -1n, -1n, 45n, 41n, 49n, 35n, 28n, 31n, -1n, -1n];
    var M = [1n, 2n, 4n, 8n, 16n, 32n, 64n, 128n, 256n, 512n, 1024n, 2048n, 4096n, 8192n, 16384n, 32768n, 65536n, 131072n, 262144n, 524288n, 1048576n, 2097152n, 4194304n, 8388608n, 16777216n, 33554432n, 67108864n, 134217728n, 268435456n, 536870912n, 1073741824n, 2147483648n, 4294967296n, 8589934592n, 17179869184n, 34359738368n, 68719476736n, 137438953472n, 274877906944n, 549755813888n, 1099511627776n, 2199023255552n, 4398046511104n, 8796093022208n, 17592186044416n, 35184372088832n, 70368744177664n, 140737488355328n, 281474976710656n, 562949953421312n, 1125899906842624n, 2251799813685248n, 4503599627370496n, 9007199254740992n, 18014398509481984n, 36028797018963968n, 72057594037927936n, 144115188075855872n, 288230376151711744n, 576460752303423488n, 1152921504606846976n, 2305843009213693952n, 4611686018427387904n, -9223372036854775808n];
    var MNSB = [[14n, 4n, 3n, 15n, 2n, 13n, 5n, 3n, 13n, 14n, 6n, 9n, 11n, 2n, 0n, 5n, 4n, 1n, 10n, 12n, 15n, 6n, 9n, 10n, 1n, 8n, 12n, 7n, 8n, 11n, 7n, 0n, 0n, 15n, 10n, 5n, 14n, 4n, 9n, 10n, 7n, 8n, 12n, 3n, 13n, 1n, 3n, 6n, 15n, 12n, 6n, 11n, 2n, 9n, 5n, 0n, 4n, 2n, 11n, 14n, 1n, 7n, 8n, 13n], [15n, 0n, 9n, 5n, 6n, 10n, 12n, 9n, 8n, 7n, 2n, 12n, 3n, 13n, 5n, 2n, 1n, 14n, 7n, 8n, 11n, 4n, 0n, 3n, 14n, 11n, 13n, 6n, 4n, 1n, 10n, 15n, 3n, 13n, 12n, 11n, 15n, 3n, 6n, 0n, 4n, 10n, 1n, 7n, 8n, 4n, 11n, 14n, 13n, 8n, 0n, 6n, 2n, 15n, 9n, 5n, 7n, 1n, 10n, 12n, 14n, 2n, 5n, 9n], [10n, 13n, 1n, 11n, 6n, 8n, 11n, 5n, 9n, 4n, 12n, 2n, 15n, 3n, 2n, 14n, 0n, 6n, 13n, 1n, 3n, 15n, 4n, 10n, 14n, 9n, 7n, 12n, 5n, 0n, 8n, 7n, 13n, 1n, 2n, 4n, 3n, 6n, 12n, 11n, 0n, 13n, 5n, 14n, 6n, 8n, 15n, 2n, 7n, 10n, 8n, 15n, 4n, 9n, 11n, 5n, 9n, 0n, 14n, 3n, 10n, 7n, 1n, 12n], [7n, 10n, 1n, 15n, 0n, 12n, 11n, 5n, 14n, 9n, 8n, 3n, 9n, 7n, 4n, 8n, 13n, 6n, 2n, 1n, 6n, 11n, 12n, 2n, 3n, 0n, 5n, 14n, 10n, 13n, 15n, 4n, 13n, 3n, 4n, 9n, 6n, 10n, 1n, 12n, 11n, 0n, 2n, 5n, 0n, 13n, 14n, 2n, 8n, 15n, 7n, 4n, 15n, 1n, 10n, 7n, 5n, 6n, 12n, 11n, 3n, 8n, 9n, 14n], [2n, 4n, 8n, 15n, 7n, 10n, 13n, 6n, 4n, 1n, 3n, 12n, 11n, 7n, 14n, 0n, 12n, 2n, 5n, 9n, 10n, 13n, 0n, 3n, 1n, 11n, 15n, 5n, 6n, 8n, 9n, 14n, 14n, 11n, 5n, 6n, 4n, 1n, 3n, 10n, 2n, 12n, 15n, 0n, 13n, 2n, 8n, 5n, 11n, 8n, 0n, 15n, 7n, 14n, 9n, 4n, 12n, 7n, 10n, 9n, 1n, 13n, 6n, 3n], [12n, 9n, 0n, 7n, 9n, 2n, 14n, 1n, 10n, 15n, 3n, 4n, 6n, 12n, 5n, 11n, 1n, 14n, 13n, 0n, 2n, 8n, 7n, 13n, 15n, 5n, 4n, 10n, 8n, 3n, 11n, 6n, 10n, 4n, 6n, 11n, 7n, 9n, 0n, 6n, 4n, 2n, 13n, 1n, 9n, 15n, 3n, 8n, 15n, 3n, 1n, 14n, 12n, 5n, 11n, 0n, 2n, 12n, 14n, 7n, 5n, 10n, 8n, 13n], [4n, 1n, 3n, 10n, 15n, 12n, 5n, 0n, 2n, 11n, 9n, 6n, 8n, 7n, 6n, 9n, 11n, 4n, 12n, 15n, 0n, 3n, 10n, 5n, 14n, 13n, 7n, 8n, 13n, 14n, 1n, 2n, 13n, 6n, 14n, 9n, 4n, 1n, 2n, 14n, 11n, 13n, 5n, 0n, 1n, 10n, 8n, 3n, 0n, 11n, 3n, 5n, 9n, 4n, 15n, 2n, 7n, 8n, 12n, 15n, 10n, 7n, 6n, 12n], [13n, 7n, 10n, 0n, 6n, 9n, 5n, 15n, 8n, 4n, 3n, 10n, 11n, 14n, 12n, 5n, 2n, 11n, 9n, 6n, 15n, 12n, 0n, 3n, 4n, 1n, 14n, 13n, 1n, 2n, 7n, 8n, 1n, 2n, 12n, 15n, 10n, 4n, 0n, 3n, 13n, 14n, 6n, 9n, 7n, 8n, 9n, 6n, 15n, 1n, 5n, 12n, 3n, 10n, 14n, 5n, 8n, 7n, 11n, 0n, 4n, 13n, 2n, 11n]];
    var ub = ["\u0053\u0063\u0072\u0069\u0070\u0074\u0020\u0062\u0079\u0020\u006c\u0065\u0072\u0064","\u006d\u006f\u0062\u0069\u002e\u006b\u0075\u0077\u006f\u002e\u0063\u006e\u002f\u006d","\u006f\u0062\u0069\u002e\u0073\u003f\u0066\u003d\u006b\u0075\u0077\u006f\u0026\u0071\u003d"];
    var BT = function (ai, n, l) {
        var l2 = 0n;
        for (var i = 0n; i < n; i = i + 1n) {
            if (ai[i] < 0n || (parseInt(l & M[(ai[i])]) == 0)) {
                continue;
            };
            l2 |= M[i];
        };
        return l2;
    };
    var des64 = function (longs, l) {
        var o = 0n;
        var O = 0n;
        var pR = ET;
        var pS = [0n, 0n];
        var si = 0n;
        var t = 0n;
        var L = 0n;
        var R = 0n;
        var o = BT(IP, 64n, l);
        pS[0] = Z & o;
        pS[1] = ((~Z) & o) >> 32n;
        for (var i = 0n; i < 16n; i = i + 1n) {
            R = pS[1n];
            R = BT(E, 64n, R);
            R ^= longs[i];
            for (var j = 0n; j < 8n; j = j + 1n) {
                pR[j] = 255n & R >> j * 8n;
            };
            O = 0n;
            for (var si = 7n; si >= 0n; si = si - 1n) {
                O <<= 4n;
                O |= MNSB[si][pR[si]];
            };
            R = BT(P, 32n, O);
            L = pS[0n];
            pS[0n] = pS[1n];
            pS[1n] = L ^ R;
        };
        pS.reverse();
        o = (~Z) & pS[1] << 32n | Z & pS[0];
        o = BT(IP_1, 64n, o);
        return o;
    };

    if (quality == "flac") {
        var strOri = "corp=kuwo&p2p=1&type=convert_url2&format=flac&rid=" + id;
    } else {
        var strOri = "corp=kuwo&p2p=1&type=convert_url2&format=mp3&rid=" + id;
    };
    let utf8Encode = new TextEncoder();
    var msgg = utf8Encode.encode(strOri);
    var msg = [];
    for (var everymsg = 0; everymsg < msgg.length; everymsg++) {
        msg[everymsg] = BigInt(msgg[everymsg]);
    };
    var j = BigInt(parseInt(msg.length / 8));
    var aL1 = ST;
    var s_l = l;
    var s_ls = aL1;
    var ll2 = BT(PC_1, 56n, s_l);
    for (var i = 0n; i < 16n; i = i + 1n) {
        ll2 = ((ll2 & LsM[Ls[i]]) << 28n - Ls[i] | (ll2 & ~LsM[Ls[i]]) >> Ls[i]);
        s_ls[i] = BT(PC_2, 64n, ll2);
    };
    var aL2 = [];
    for (var t = 0; t < j; t++) {
        aL2.push(0n);
    };
    for (var m = 0n; m < j; m = m + 1n) {
        for (var n = 0n; n < 8n; n = n + 1n) {
            aL2[m] |= msg[n + m * 8n] << n * 8n;
        };
    };
    var aL3 = [];
    for (var t = 0; t < parseInt((1n + 8n * (j + 1n)) / 8n); t++) {
        aL3.push(0n);
    };
    for (var i1 = 0n; i1 < j; i1 = i1 + 1n) {
        aL3[i1] = des64(aL1, aL2[i1]);
    };
    var aB11 = strOri.substr(parseInt(j * 8n));
    var aB12 = utf8Encode.encode(aB11);
    var aB1 = [];
    for (var t = 0; t < aB12.length; t++) {
        aB1[t] = BigInt(aB12[t]);
    };
    var l2 = 0n;
    for (var i2 = 0n; i2 < BigInt(msg.length % 8); i2 = i2 + 1n) {
        l2 |= aB1[i2] << i2 * 8n;
    };
    aL3[j] = des64(aL1, l2);
    var aB2 = [];
    for (var t = 0; t < (8 * aL3.length); t++) {
        aB2.push(0n);
    };
    var i4 = 0n;
    for (var t = 0; t < aL3.length; t++) {
        var l3 = aL3[t];
        for (var i6 = 0n; i6 < 8n; i6 = i6 + 1n) {
            aB2[i4] = (255n & l3 >> i6 * 8n);
            i4 += 1n;
        };
    };
    var b1 = aB2;
    var b2 = [];
    for (var i = 0; i < b1.length; i++) {
        b2[i] = parseInt(b1[i]);
    };
    var bi = '';
    var bs = new Uint8Array(b2);
    var len = bs.byteLength;
    for (var i = 0; i < len; i++) {
        bi += String.fromCharCode(bs[i]);
    };
    console.log(ub[0]);
    return `http://${ub[1] + ub[2]}${btoa(bi)}`;
};

const musicSources = {
    kw: {
        info: {
            name: '酷我音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac'],
        },

        musicUrl({ songmid }, quality) {
            quality = {
                '128k': 'aac',
                '320k': 'mp3',
                flac: 'flac',
            }[quality]
            return encode(g = songmid, h = quality).then(e => {
                return httpRequest(e, {
                    method: "GET",
                    headers: { "User-Agent": "okhttp/3.10.0" },
                }).then(data => {
                    return /url=(.*\r)/.exec(data)[1].replace("\r", "");
                });
            });
        },
    },
    kg: {
        info: {
            name: '酷狗音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k'],
        },

        musicUrl({ hash }, quality) {
            return httpRequest('https://music.fy6b.com/index/mp3orflac', {
                method: 'POST',
                form: {
                    type: 'kugou',
                    id: hash,
                },
            }).then(body => {
                const url = body.url
                if (!url) return reject(new Error('Failed.'))
                return Promise.resolve(url)
            })
        },
    },
    tx: {
        info: {
            name: '企鹅音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k'],
        },

        musicUrl({ songmid }, quality) {
            return httpRequest('https://music.fy6b.com/index/mp3orflac', {
                method: 'POST',
                form: {
                    type: 'tencent',
                    id: songmid,
                },
            }).then(body => {
                const url = body.url
                if (!url) return reject(new Error('Failed.'))
                return Promise.resolve(url)
            })
        },
    },
    wy: {
        info: {
            name: '网易音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k'],
        },

        musicUrl({ songmid }, quality) {
            return httpRequest('https://music.fy6b.com/index/mp3orflac', {
                method: 'POST',
                form: {
                    type: 'netease',
                    id: songmid,
                },
            }).then(body => {
                const url = body.url
                if (!url) return reject(new Error('Failed.'))
                return Promise.resolve(url)
            })
        },
    },
    mg: {
        info: {
            name: '咪咕音乐',
            type: 'music',
            actions: ['musicUrl'],
            qualitys: ['128k', '320k', 'flac', 'flac24bit'],
        },

        musicUrl({ songmid }, quality) {
            quality = {
                '128k': '1',
                '320k': '2',
                flac: '3',
                flac24bit: '4',
            }[quality]

            return httpRequest(`https://api.dog886.com/v1/getMiGuSong?id=${songmid}&type=${quality}`, {
                method: 'GET',
            }).then(body => {
                if (!body.data.url) return Promise.reject(new Error('Failed.'))
                return Promise.resolve(`https:${body.data.url}`)
            })
        },
    },
}



const musicSourcesInfo = {}
Object.keys(musicSources).forEach(item => {
    musicSourcesInfo[item] = musicSources[item].info
})

send(EVENT_NAMES.inited, {
    status: true,
    openDevTools: false,
    sources: musicSourcesInfo,
})

on(EVENT_NAMES.request, ({ source, action, info }) => {
    switch (action) {
        case 'musicUrl':
            return musicSources[source].musicUrl(info.musicInfo, info.type).catch(err => {
                return Promise.reject(err)
            })
    }
})
