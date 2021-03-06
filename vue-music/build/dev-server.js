require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()

// 通过后端请求数据到服务器‘/getDiscList’路径上
// 定义网站‘getDiscList’页面的路由
apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  // 用axios请求数据
  axios.get(url, {
    // 配置header
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    // 与请求一起发送的url参数（前端的请求参数）
    params: req.query
  }).then((response) => {
    // 将请求到的回复做一个json格式的响应，返回给前端
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/songlist', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    // 配置header
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    // 与请求一起发送的url参数（前端的请求参数）
    params: req.query
  }).then((response) => {
    var ret = response.data
    // ret是jsoncallback的话，要获取callback中的内容，再解析成json
    if (typeof ret === 'string') {
      // 以任何字母数字下划线(开头，)结尾，子表达式是{不为()的任意字符多个}
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        // 将第一个匹配到的子串解析成json
        ret = JSON.parse(matches[1])
      }
    }
    // 将请求到的回复做一个json格式的响应，返回给前端
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })

})
// 获取歌手所有歌曲信息
apiRoutes.post('/getPurlUrl', function (req, res) {
  // http://dl.stream.qqmusic.qq.com/C400002qU5aY3Qu24y.m4a?guid=6763139031&vkey=1993E9DA0CEE7302DA379A5E01BDECE386F902BB8537229232D0A507BE9B2536F798343962E0C0430A88950BA4E2B36F75420ECA48FE0DD3&uin=0&fromtag=999
  // http://dl.stream.qqmusic.qq.com/C400002qU5aY3Qu24y.m4a?guid=6079595955&vkey=060E4F22A523E441B942DAA5C57F5A4BA4E8E15A20B2C682DD2FA3176C6D407131F36B5B61C14D3ECCFAE7EE652E5012AFD2FE118404A970&uin=0&fromtag=999
  // http://dl.stream.qqmusic.qq.com/C4000039MnYb0qxYhV.m4a?guid=6079595955&vkey=12EF9BD06630B73CD3F56F079CDDFAC0858ACF2FB1DEDC78CF333711F6DAFAF5C59AA99135EA3F1D8464651A5700E04D2B4C23B000A21D4E&uin=0&fromtag=999
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  // var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
 // 用axios请求数据
  axios.post(url, {
    // 配置header
    headers: {
      referer: 'https://y.qq.com/',
      host: 'u.y.qq.com'
    },
    // 与请求一起发送的url参数（前端的请求参数）
    params: req.query
  }).then((response) => {
    // 将请求到的回复做一个json格式的响应，返回给前端
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg'
  axios.get(url, {
    // 配置header
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    // 与请求一起发送的url参数（前端的请求参数）
    params: req.query
  }).then((response) => {
    var ret = response.data
    // ret是jsoncallback的话，要获取callback中的内容，再解析成json
    if (typeof ret === 'string') {
      // 以任何字母数字下划线(开头，)结尾，子表达式是{不为()的任意字符多个}
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        // 将第一个匹配到的子串解析成json
        ret = JSON.parse(matches[1])
      }
    }
    // 将请求到的回复做一个json格式的响应，返回给前端
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })

})

app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
