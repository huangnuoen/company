// 加载http模块
var http = require('http');
// 创建web服务器
var server = http.createServer(function (req, res) {
    // 回调函数
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('hello Nodejs\n');
    // 在1337端口监听请求
})

server.listen(1337, '127.0.0.1');
console.log('server running at http://127.0.0.1:1337/');