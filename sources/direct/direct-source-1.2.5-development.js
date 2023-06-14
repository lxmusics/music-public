/*!
 * @name 测试接口
 * @description 哎嘿 最后的选择哦~
 * @version v1.2.5
 * @author Folltoshe
 * @repository https://github.com/lxmusics/lx-music-source
 * QWQ
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/utils/lx.js
const { EVENT_NAMES, on, send, version } = window.lx

/* harmony default export */ const lx = ({
  EVENT_NAMES,
  on,
  send,
  version,
  isDev: "development" === 'development',
});

;// CONCATENATED MODULE: ./src/utils/package.js
const packageJson = __webpack_require__(147)

/* harmony default export */ const utils_package = ({
  name: packageJson.name,
  version: packageJson.version,
  author: packageJson.author,
  buildInfo: packageJson.buildInfo,
});

;// CONCATENATED MODULE: ./src/utils/request.js
const { request } = window.lx

const httpFetch = (url, options) => {
  return new Promise((resolve, reject) => {
    request(url, options, (err, resp) => {
      if (err) return reject(err)
      resolve(resp)
    })
  })
}

;// CONCATENATED MODULE: ./src/musicSdk/kg/music.js


/* harmony default export */ const music = ({
  async musicUrl({ hash }, quality) {
    const key = md5(hash.toLowerCase() + 'kgcloudv2100500')

    const requestUrl = `http://trackercdn.kugou.com/i/v2/?cmd=26&key=${key}&hash=${hash.toLowerCase()}&pid=1&behavior=play&mid=0&appid=1005&userid=0&version=8876&vipType=0&token=0`
    const request = await httpFetch(requestUrl, {
      method: 'GET',
    })
    const { body } = request

    if (body.status != 1) throw new Error('Failed to get music url.')
    return body.url[0]
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/kg/index.js


/* harmony default export */ const kg = ({
  info: {
    name: '酷狗音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['128k'],
  },
  actions: {
    music: music,
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/kw/music.js


/* harmony default export */ const kw_music = ({
  async musicUrl({ songmid }, quality) {
    const requestUrl = `http://www.kuwo.cn/api/v1/www/music/playUrl?mid=${songmid}&type=music&httpsStatus=1`

    const request = await httpFetch(requestUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0',
        Referer: 'http://kuwo.cn/',
      },
    })
    const { body } = request

    if (body.code != 200) throw new Error('Failed to get music url.')
    return body.data.url
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/kw/index.js


/* harmony default export */ const kw = ({
  info: {
    name: '酷我音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['128k'],
  },
  actions: {
    music: kw_music,
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/mg/music.js


const tools = {
  handleUrl(url) {
    return url.replace(/ftp:\/\/[^/]+/, 'https://freetyst.nf.migu.cn')
  },
  handleResult(raw) {
    const types = {}
    raw.newRateFormats.forEach(item => {
      switch (item.formatType) {
        case 'PQ':
          types['128k'] = handleUrl(item.url)
          break
        case 'HQ':
          types['320k'] = handleUrl(item.url)
          break
        case 'SQ':
          types.flac = handleUrl(item.androidUrl)
          break
        case 'ZQ':
          types.flac24bit = handleUrl(item.androidUrl)
          break
      }
    })
    return types
  },
}

/* harmony default export */ const mg_music = ({
  async musicUrl({ songmid }, quality) {
    const requestUrl = `https://c.musicapp.migu.cn/MIGUM2.0/v1.0/content/resourceinfo.do?copyrightId=${songmid}&resourceType=2`
    const request = await httpFetch(requestUrl, {
      headers: {
        referer: 'https://music.migu.cn',
        origin: 'https://music.migu.cn',
      },
    })

    const { body } = request
    if (body.code != '000000') throw new Error('Failed to get music url.')

    const result = tools.handleResult(body.resource[0])
    // 如果当前音质获取失败自动获取最大那一个
    let url = result[quality] ?? result[Object.keys(result).pop()]
    if (!url) throw new Error('Failed to get music url.')

    return url
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/mg/index.js


/* harmony default export */ const mg = ({
  info: {
    name: '咪咕音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['128k', '320k', 'flac'],
  },
  actions: {
    music: mg_music,
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/tx/music.js


const music_tools = {
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
}

/* harmony default export */ const tx_music = ({
  async musicUrl({ songmid }, quality) {
    const info = music_tools.qualityMap[quality]

    const request = await httpRequest('https://u.y.qq.com/cgi-bin/musicu.fcg', {
      method: 'POST',
      body: {
        comm: {
          format: 'json',
          ct: 24,
          cv: 0,
          uid: 0,
        },
        req: {
          module: 'vkey.GetVkeyServer',
          method: 'CgiGetVkey',
          param: {
            filename: [`${info.s}${songmid}${songmid}${info.e}`],
            guid: '10000',
            songmid: [songmid],
            songtype: [0],
            uin,
            loginflag: 1,
            platform: '20',
          },
        },
      },
      headers: {
        channel: '0146951',
      },
    })
    const { body } = request
    if (body.code != 0 || body.req.code != 0) throw new Error('Failed to get music url.')

    const { purl } = body.req.data.midurlinfo[0]
    if (!purl) throw new Error('Failed to get music url.')
    return body.req.data.sip[0] + purl
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/tx/index.js


/* harmony default export */ const tx = ({
  info: {
    name: '企鹅音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['128k'],
  },
  actions: {
    music: tx_music,
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/wy/music.js


const wy_music_tools = {
  qualityMap: {
    '128k': 128000,
    '320k': 320000,
    flac: 999000,
  },
  cookie: 'os=pc',
  eapi(url, object) {
    const eapiKey = 'e82ckenh8dichen8'
    const text = typeof object === 'object' ? JSON.stringify(object) : object
    const message = `nobody${url}use${text}md5forencrypt`
    const digest = utils.crypto.md5(message)
    const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`
    return {
      params: utils.buffer.bufToString(utils.crypto.aesEncrypt(data, 'aes-128-ecb', eapiKey, iv), 'hex').toUpperCase(),
    }
  },
}

/* harmony default export */ const wy_music = ({
  async musicUrl({ songmid }, quality) {
    quality = wy_music_tools.qualityMap[quality]
    const data = {
      ids: `[${songmid}]`,
      br: quality,
    }

    const request = await httpFetch('https://interface3.music.163.com/eapi/song/enhance/player/url', {
      method: 'POST',
      form: wy_music_tools.eapi('/api/song/enhance/player/url', data),
      headers: {
        cookie: wy_music_tools.cookie,
      },
    })
    const { body } = request

    const { url } = body.data[0]
    if (!url) throw new Error('Failed to get music url.')
    return url
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/wy/index.js


/* harmony default export */ const wy = ({
  info: {
    name: '网易音乐',
    type: 'music',
    actions: ['musicUrl'],
    qualitys: ['128k'],
  },
  actions: {
    music: wy_music,
  },
});

;// CONCATENATED MODULE: ./src/musicSdk/index.js






const musicSdks = { kg: kg, kw: kw, mg: mg, tx: tx, wy: wy }
const musicSources = {
  infos: {},
  actions: {},
}

Object.keys(musicSdks).forEach(item => {
  musicSources.infos[item] = musicSdks[item].info
  musicSources.actions[item] = musicSdks[item].actions
})

/* harmony default export */ const musicSdk = (musicSources);

;// CONCATENATED MODULE: ./src/index.js




console.info(
  `--------`,
  `\nApplication Version: lx-music-source@${lx.version}`,
  `\nSource Version: ${utils_package.name}@${utils_package.version}`,
  `\nRepository: ${utils_package.buildInfo.repository}`,
  `\nDevelopment: ${lx.isDev}`,
  `\nMusicSdk: ${Object.keys(musicSdk.infos).join(' ')}`,
  `\n--------
`
)

lx.on(lx.EVENT_NAMES.request, ({ source, action, info }) => {
  const actionInfo = `[${source} - ${action}] (${info.musicInfo.songmid} - ${info.type})`
  switch (action) {
    case 'musicUrl':
      console.info(`start run action ${actionInfo}: `, `\n${info.musicInfo.name} - ${info.musicInfo.singer}`)
      return musicSdk.actions[source].music
        .musicUrl(info.musicInfo, info.type)
        .then(data => {
          console.info(`action run success ${actionInfo}:`, `\n${data}`)
          return Promise.resolve(data)
        })
        .catch(err => {
          console.error(`action run faild ${actionInfo}:`, `\n${err.message}`)
          return Promise.reject(err)
        })
    default:
      return Promise.reject('action not fond')
  }
})

lx.send(lx.EVENT_NAMES.inited, {
  status: true,
  openDevTools: lx.isDev,
  sources: musicSdk.infos,
})


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"direct-source","version":"1.2.5","description":"None","author":"Folltoshe","scripts":{"build":"npm run build:prod && npm run build:dev","build:prod":"cross-env NODE_ENV=production webpack --config webpack.config.js","build:dev":"cross-env NODE_ENV=development webpack --config webpack.config.js"},"repository":{"type":"git","url":"git+https://github.com/lxmusics/lx-music-source.git"},"buildInfo":{"author":"Folltoshe","name":"测试接口","description":"哎嘿 最后的选择哦~","repository":"https://github.com/lxmusics/lx-music-source","output":{"name":"direct-source-{version}-{mode}.js","head":"@name {name}\\n@description {description}\\n@version v{version}\\n@author {author}\\n@repository {repository}\\nQWQ"}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__(878)

})();

/******/ })()
;