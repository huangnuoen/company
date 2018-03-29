## 模块的分类
1. 核心模块
2. 文件模块
3. 第三方模块 
 - 通过npm install 安装的模块和本地模块 路径 文件名

 ## 模块流程
 1. 创建模块 
 2. 导出模块 export
 3. 加载模块 require()
 4. 使用模块 add()

## api
1. url
  - url.parse() 把url字符串解析成对象
    - 第一个参数是url,第二个参数选择是否将query解析成对象,第三个参数
  - url.format() 把对象解析成url字符串
  - url.resolve()https://www.imooc.com/video/6711
2. querystring
  - querystring.stringify() 序列化，将对象拼接为查询字符串
    - 第一个参数是对象，第二个参数是连接符，第三个是key和value的连接符
  - querystring.parse() 反序列化
  - querystring.escape(),querystring.unescape() 汉字转义和反转义
    ```
    querystring.escape('<哈哈>')
    =>  '%3C%E5%93%88%E5%93%88%3E'
    ```
3. sdf

## http
1. Chrome搜索自身的DNS缓存
2. 搜索本身系统的缓存
3. 读取本地的HOST文件
4. 浏览器发起一个DNS的一个系统调用
4.1 宽带运营商服务器查看本身缓存
4.2 运营商服务器发起一个迭代DNS解析的请求，向根域com, baidu.com 的IP地址请求
5. 枯
  