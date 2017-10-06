// 生产环境服务
var express = require('express')
var config = require('./config/index')
var axios = require('axios')

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

apiRoutes.get('/songlist', function(req, res) {
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

apiRoutes.get('/lyric', function(req, res) {
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

// 静态资源存放
app.use(express.static('./dist'))

// 启动服务
var port = process.env.PORT || config.build.port
module.exports = app.listen(port, function(err) {
	if (err) {
		console.log(err)
		return
	}
	console.log('Listening at http://localhost:' + port + '/n')
})