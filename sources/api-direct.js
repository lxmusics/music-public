/**
 * @name 试听接口
 * @description 哎嘿 最后的选择哦~
 * @version 1.1.0
 * @author Folltoshe
 * @homepage https://github.com/lxmusics
 */

const { EVENT_NAMES, on, send, request, utils: lxUtils, version } = window.lx

const isDev = false
const httpFetch = (url, options) => {
  return new Promise((resolve, reject) => {
    request(url, options, (err, resp) => {
      if (err) return reject(err)
      resolve(resp.body)
    })
  })
}
const utils = {
  buffer: {
    from: lxUtils.buffer.from,
    bufToString: lxUtils.buffer.bufToString,
  },
  crypto: {
    aesEncrypt: lxUtils.crypto.aesEncrypt,
    md5: lxUtils.crypto.md5,
    randomBytes: lxUtils.crypto.randomBytes,
    rsaEncrypt: lxUtils.crypto.rsaEncrypt,
  },
  zlib: {
    deflate: lxUtils.zlib.deflate,
    inflate: lxUtils.zlib.inflate,
  },
}

const musicSources = {
  /** 酷我 */
  kw: {
    info: {
      name: '酷我音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k'],
    },
    tools: {},
    actions: {
      async musicUrl({ songmid }, quality) {
        console.log(`start kw fetch ${songmid} - ${quality}`)
        const targetUrl = `http://www.kuwo.cn/api/v1/www/music/playUrl?mid=${songmid}&type=music&httpsStatus=1`

        const body = await httpRequest(targetUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
            Referer: 'http://kuwo.cn/',
          },
        })

        if (body.code != 200) throw new Error('Failed to get music url.')
        return body.data.url
      },
    },
  },
  /** 酷狗 */
  kg: {
    info: {
      name: '酷狗音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k'],
    },
    tools: {},
    actions: {
      async musicUrl({ hash }, quality) {
        console.log(`start kg fetch ${songmid} - ${quality}`)
        const key = md5(hash.toLowerCase() + 'kgcloudv2100500')
        const targetUrl = `http://trackercdn.kugou.com/i/v2/?cmd=26&key=${key}&hash=${hash.toLowerCase()}&pid=1&behavior=play&mid=0&appid=1005&userid=0&version=8876&vipType=0&token=0`

        const body = await httpRequest(targetUrl, {
          method: 'GET',
        })

        if (body.status != 1) throw new Error('Failed to get music url.')
        return body.url[0]
      },
    },
  },
  /** 腾讯 */
  tx: {
    info: {
      name: '企鹅音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k'],
    },
    tools: {
      qualityMap: {
        '128k': {
          s: 'M500',
          e: '.mp3',
          bitrate: '128kbps',
        },
        '320k': {
          s: 'M800',
          e: '.mp3',
          bitrate: '320kbps',
        },
        flac: {
          s: 'F000',
          e: '.flac',
          bitrate: 'FLAC',
        },
      },
    },
    actions: {
      async musicUrl({ songmid }, quality) {
        console.log(`start tx fetch ${songmid} - ${quality}`)
        const targetUrl = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        const fileInfo = musicSources.tx.tools.qualityMap[quality]
        const requestBody = {
          req: {
            module: 'vkey.GetVkeyServer',
            method: 'CgiGetVkey',
            param: {
              filename: [`${fileInfo.s}${songmid}${songmid}${fileInfo.e}`],
              guid: '10000',
              songmid: [songmid],
              songtype: [0],
              uin,
              loginflag: 1,
              platform: '20',
            },
          },
          loginUin: '0',
          comm: {
            uin,
            format: 'json',
            ct: 24,
            cv: 0,
          },
        }

        const body = await httpRequest(`${targetUrl}?format=json&data=${JSON.stringify(requestBody)}`, {
          method: 'GET',
          headers: {
            channel: '0146951',
            uid: 1234,
          },
        })

        const { purl } = body.req.data.midurlinfo[0]
        if (purl === '') throw new Error('Failed to get music url.')
        return body.req.data.sip[0] + purl
      },
    },
  },
  /** 网易 */
  wy: {
    info: {
      name: '网易音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k'],
    },
    tools: {
      qualityMap: {
        '128k': 128000,
        '320k': 320000,
        flac: 999000,
      },
      cookie: 'os=pc',
      eapi: async (url, object) => {
        const eapiKey = 'e82ckenh8dichen8'
        const text = typeof object === 'object' ? JSON.stringify(object) : object
        const message = `nobody${url}use${text}md5forencrypt`
        const digest = utils.crypto.md5(message)
        const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`
        return {
          params: utils.buffer
            .bufToString(utils.crypto.aesEncrypt(data, 'aes-128-ecb', eapiKey, iv), 'hex')
            .toUpperCase(),
        }
      },
    },
    actions: {
      async musicUrl({ songmid }, quality) {
        quality = musicSources.wy.tools.qualityMap[quality]
        const targetUrl = 'https://interface3.music.163.com/eapi/song/enhance/player/url'
        const eapiUrl = '/api/song/enhance/player/url'
        const data = {
          ids: `[${songmid}]`,
          br: quality,
        }
        const requestBody = await musicSources.wy.tools.eapi(eapiUrl, d)

        const body = await httpRequest(targetUrl, {
          method: 'POST',
          form: requestBody,
          headers: {
            cookie: musicSources.wy.tools.cookie,
          },
        })

        const { url } = body.data[0]
        if (!url) throw new Error('Failed to get music url.')
        return url
      },
    },
  },
  /** 咪咕 */
  mg: {
    info: {
      name: '咪咕音乐',
      type: 'music',
      actions: ['musicUrl'],
      qualitys: ['128k'],
    },
    tools: {
      qualityMap: {
        '128k': 'PQ',
        '320k': 'HQ',
        flac: 'SQ',
        flac32bit: 'ZQ',
      },
    },
    actions: {
      async musicUrl({ songmid }, quality) {
        console.log(`start mg fetch ${songmid} - ${quality}`)
        quality = musicSources.mg.tools.qualityMap[quality]
        const targetUrl = `https://app.c.nf.migu.cn/MIGUM2.0/strategy/listen-url/v2.2?netType=01&resourceType=E&songId=${songmid}&toneFlag=${quality}`

        const body = await httpFetch(targetUrl, {
          headers: {
            channel: '0146951',
            uid: 1234,
            'User-Angent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.0.0',
            Referer: 'https://music.migu.cn',
            Origin: 'https://music.migu.cn',
          },
        })
        if (body.code != '000000') throw new Error('Failed to get music url.')

        const msuicUrl = body.data.url
        if (!msuicUrl) throw new Error('Failed to get music url.')

        return msuicUrl
      },
    },
  },
}

// 获取所有源
const musicInfos = {}
Object.keys(musicSources).forEach(item => {
  musicInfos[item] = musicSources[item].info
})

// 监听请求事件
on(EVENT_NAMES.request, ({ source, action, info }) => {
  switch (action) {
    case 'musicUrl':
      return musicSources[source].actions[action](info.musicInfo, info.type)
        .then(data => Promise.resolve(data))
        .catch(err => Promise.reject(err))
  }
})

// 发送初始化成功
send(EVENT_NAMES.inited, {
  status: true,
  openDevTools: isDev,
  sources: musicInfos,
})
