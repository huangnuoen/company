### 轮播图组件
传入存放img的容器，控制圆点
html结构：carouse>picture存放img的容器>img
- 关键：
1. 控制图片位移变化
2. 自动播放
3. 圆点控制播放
4. 圆点样式（用class控制）
- 对象原型方法：
1. autoPlay
2. btnTab
3. next
4. prev
5. init

### 全局中的立即调用函数（全局中的匿名函数）
```
(function() {
Var a = function() {};
})()
```
在调用“立即调用函数”中定义的方法a，无法直接在window中调用，因为a是在“立即调用函数”中定义的方法，属于局部变量，必须有接口才能调用，要在全局中调用a有2种方法：
1. 在立即调用函数中返回该方法a
```
Var b = (function() {
Var a = function() {};
Return a;
})()//b==a,即把a赋给了b(b为全局变量），可在全局调用
New b();
```
2. 在立即调用函数中将方法a赋给window.a，直接将a提升为全局方法
```
(function() {
Var a = function() {};
Window.a = a;
})()
New a();
```
- 用window.onload改变rem的值以渲染页面，是在文档加载完成后进行
而加载的js文件是在DOM完成后


### 如何使用组件？
html: .carousel>div.picture>img*n^ul#listTab>li*n
css: div.picture width=img.width * n; absolute;
js: var a = new Carousel("div.picture","#listTab")

     