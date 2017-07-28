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
	- 可指定默认值
2. 对象解构
	- 可指定默认值
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
	- 对象的解构赋值的内部机制，是先找到**同名**属性，然后再***赋给对应的变量***。真正***被赋值的是后者***，而不是前者。
	```
	{
		let metaData = {
			title: 'json',
			desc: [{title: 'description'}]
		};
		let {title: title1, desc: desc1} = metaData;
		console.log(title1, desc1);//json [Object]
	}
	```
3. 圆括号的使用：赋值语句的非模式部分才能使用
4. 使用场景
	- 交换变量
	- 从函数返回多个值
	- 函数参数的定义，能将一组参数与变量名对应起来
	```
	// 参数是一组有次序的值
	function f([x, y, z]) { ... }
	f([1, 2, 3]);

	// 参数是一组无次序的值
	function f({x, y, z}) { ... }
	f({z: 3, y: 2, x: 1});
	```
	- 提取json数据
	```
	let jsonData = {
	  id: 42,
	  status: "OK",
	  data: [867, 5309]
	};

	let { id, status, data: number } = jsonData;

	console.log(id, status, number);
	// 42, "OK", [867, 5309]
	```
	- 设置函数参数的默认值

### 正则扩展
1. 如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符。
```
	let regex3 = new RegExp(/xyz/ig, 'i');//第二个修饰符会覆盖前一个
	console.log(regex3.flags);
```
2. 增加y修饰符（粘连符）
	- 与g修饰符区别在，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从***剩余的第一个位置***开始，y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效。
	- 在split方法中使用y修饰符，原字符串必须以分隔符开头。这也意味着，只要匹配成功，数组的第一个成员肯定是空字符串。后续的分隔符只有紧跟前面的分隔符，才会被识别。
	```
	'#x#'.split(/#/y)
	// [ '', 'x#' ]

	'##'.split(/#/y)
	// [ '', '', '' ]
	```
	- 单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配
4 sticky属性，判断是否开启y修饰符
5. u修饰符，匹配unicode模式
	- 点字符，对于码点大于2个字节，点字符不能识别，必须加上u
	- 量词，使用u后，所有的量词都会正确识别码点大于2的字符
6. 字符串的正则方法match() replace() search() split()。ES6将这4个方法，在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上。
	>String.prototype.match 调用 RegExp.prototype[Symbol.match]
	>String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
	>String.prototype.search 调用 RegExp.prototype[Symbol.search]
	>String.prototype.split 调用 RegExp.prototype[Symbol.split]

### 字符串扩展
1. Unicode字符
	- JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。但只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。ES6 对这一点做出了改进，只要将码点***放入大括号***，就能正确解读该字符。
	```
	console.log('s', '\u{20bb7}');//s 𠮷
	```
2. codePointAt()
	- 能够正确处理4个字节储存的字符，返回一个字符的码点。
	- codePointAt方法的参数，是字符在字符串中的位置（从0开始）。
3. String.fromCodePoint()
4. 字符串遍历器
5. includes(), startsWith(), endsWith()
	- 确定一个字符串是否包含在另一个字符串中
6. repeat()
	- 指定重复次数，返回新增的字符串
7. **模板字符串**
	- 用`将模板包起来，其中的变量要使用${变量}
	```
	let name = 'List';
	let info = 'hello world';
	let m = ``i am ${name}, ${info}``;
	console.log(m);
	```
	- 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
	- 使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。如果你不想要这个换行，可以使用trim方法消除它。
8. 补齐空白 **padStart(), padEnd()**
	- 可用于自动补齐、字符串提示
9. 标签模板
	- 防止恶意攻击
	- 处理多语言
10. String.raw 自动转义