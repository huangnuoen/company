## 构建工具
### app
- 存放原始代码

### server
- 存放要处理的服务器文件

### tasks
- 处理任务
1. scripts.js 处理js存于server/public/js
2. css.js  处理css文件存于server/public中
3. pages.js 处理html文件另存于server中
4. server.js
5. browser.js 处理app文件,将前3个脚本关联起来

### 将各个任务关联起来

### 修改了app.js bin\www

## es6语法(强制严格模式:变量未经声明不可使用)

### let  const
- 只在当前{块级作用域}有效
1. let
	- 不可重复定义
2. const
	- 声明的时候必须赋值
	- 定义常量
	- 当常量是值类型，不可修改
	- 当常量是对象等引用类型，**常量指向对象**，指针不可修改，但**对象本身可能修改**

### 解构赋值
1. 数组解构
	- 数组的元素是按次序排列的，变量的取值由它的位置决定
2. 对象解构
	- 对象的属性没有次序，**变量必须与属性同名**，才能取到正确的值。
```
{
	let metaData = {
		title: 'json',
		desc: [{title: 'description'}]
	};
	let {title, desc} = metaData;
	console.log(title, desc);//json [Object]
}
```