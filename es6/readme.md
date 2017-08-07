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
	let m = `i am ${name}, ${info}`;
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

### 数值扩展
1. ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变
	- Number.parseInt()
2. Number.isInteger() 判断是否为整数
3. Math.trunc() 去除一个数的小数部分
4. Math.sign() 判断正数、负数还是零
>参数为正数，返回+1；
>参数为负数，返回-1；
>参数为0，返回0；
>参数为-0，返回-0;
>其他值，返回NaN
5. Math.cbrt() 计算一个数的立方根

### 数组扩展
1. Array.of() 用于将一组值，转换为数组。可以用来代替new Array()
2. Array.from() 
	-用于将两类对象转为真正的数组：**类似数组的对象（array-like object）**和**可遍历（iterable）的对象**（包括ES6新增的数据结构Set和Map）。常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
	- Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
3. 数组实例的fill()方法
	- 使用给定值，填充一个数组。
	- 
	fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
4. 数组实例的entries(),keys(),values()
	- 用于遍历数组，返回一个数组，可以用for...of进行遍历
	```
	for(let index of [3, 5, 7].keys()){
		console.log(index);
	}
	for(let value of [3, 5, 7].values()){
		console.log(value);
	}
	for(let [i, val] of [3, 5, 7].entries()){
		console.log(i, val);
	}
	```
5. 实例find(), findIndex()查找符合条件的数据
	- 回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
6. 实例includes() 判断是否包含该值，也能检测NaN

### 函数扩展
1. 参数默认值
	- 参数默认值后面不可以再有没有默认值参数
	- 参数变量是默认声明的，不能用let,const再次声明
	- 函数**不能有同名参数**
	- 参数默认值不是传值的，而是每次都**重新计算**默认值表达式的值。也就是说，参数默认值是惰性求值的。
	```
	function fetch(url, { method = 'GET' } = {}) {
	  console.log(method);
	}
	fetch('http://example.com')
	// "GET"
	```
	函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。
2. **参数默认值的解构赋值**
	```
	//指定参数默认值为一个空对象，设置了解构赋值的默认值，
	function m1({x = 0, y = 0} = {}) {
	  return [x, y];
	}
	//指定参数的默认值是一个有具体属性的对象，不指定解构赋值的默认值，在没有指定参数的情况下，参数的默认值才会生效
	function m2({x, y} = { x: 0, y: 0 }) {
	  return [x, y];
	}
	
	// 函数没有参数的情况
	m1() // [0, 0]
	m2() // [0, 0]

	// x有值，y无值的情况
	console.log(m1({x: 3}));//[3, 0]
	console.log(m2({x: 3}));//[3, undefined]

	// x和y都无值的情况
	m1({}) // [0, 0];
	m2({}) // [undefined, undefined]
	```
3. rest参数
	- 把参数转化为数组，rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。
	- rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。
	- rest也可以将数组转化为单个数据
4. **箭头函数**
	```
	let arrow = v => 2*v;//函数名 = 参数 => 函数体
	```
	- 箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
	- 函数体内的this对象，就是**定义时所在的对象**，而不是使用时所在的对象。
	- 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
	- 不可以当作构造函数
	- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
	- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
5. 尾调用   指某个函数的最后一步是调用另一个函数
	- 尾调用不一定出现在函数尾部，只要是最后一步操作即可。
	- 尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。
	- “尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

### 对象的扩展
1. 属性，方法简写
	- ES6 允许在对象之中，直接写变量。这时，属性名为变量名, 属性值为变量的值
2. 属性表达式
3. Object.is()
	- 用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
4. Object.assign()
	- 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target），第一个参数是目标对象，后面的参数都是源对象。
	- 属于浅复制，也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。
	```
	Object.assign({target: 1}, {src1: 2}, {src2: 3})
	```
5. 扩展运算符

### Symbol
1. Symbol() 第7种数据类型，不属于对象,不能用new
2. Symbol.for()
	- 它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。
	- Symbol.keyFor(),返回一个已登记的 Symbol 类型值的key
3. 作为属性名
	- 每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
	- Symbol 值作为对象属性名时，***不能用点运算符***。因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须**放在方括号之中**
	- 无法通过for...of，for...in得到Symbol()作为属性名的属性
4. Object.getOwnPropertySymbols(obj) 获得指定对象的返回所有Symbol属性名，所有用作属性名的 Symbol 值。
5. Reflect.ownKeys(obj)
	- 返回Symbol和非Symbol的属性名

### Set和Map数据结构
1. Set
	1.1 Set
	- 新的数据结构，类似于数组，但是成员的值都是***唯一***的，没有重复的值。本身是一个构造函数，用来生成Set 数据结构。
	- size属性 获取Set 的长度
	- 可用来去重，不会自动转化数据类型
	- Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
	```
	new Set([1, 2, 3, '2', 3]);
	```
	1.2 实例方法
	- add() 
	- delete() 删除
	- clear() 清空
	- has() 判断是否有该数据
	1.3 遍历
	- 用for...of, forEach() 遍历Set, Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。这意味着，可以省略values方法，**直接用for...of循环遍历 Set**。
2. WeakSet
	2.1 WeakSet 的成员只能是**对象**，而不能是其他类型的值。
	2.2 弱引用，
	- 即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
	- WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。
	2.3 没有clear()方法和size属性，不可遍历
3. Map
	3.1 类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
	- 初始化，可接受一个数组作为参数，该数组的成员是一个个表示键值对的数组。
	```
	new Map([['a', 123], ['b', 456]])
	```
	- size属性
	3.2 方法
	- set()  Map 结构的set方法，将对象o当作m的一个键
	- delete(), clear(), has()
	- get() 得到键值
	3.3 遍历 keys(),values(),entries()
4. WeakMap
5. Set, Map 与 Array, Object对比
	- 增查改删
	- 能使用Map不使用Array, 
	- 对数据唯一性有要求，使用set，放弃object

### Proxy Reflect
1. Proxy
	- 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
	- 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
	- 初始化
	```
	new Proxy(obj, {});
	```
	- get(target, key, value){},//拦截对象属性的读取
	- set(target, key, value){}//拦截对象设置属性
	- has(target, key, value){}//拦截key in object操作
	- deleteProperty(target, key, value){}//拦截删除
	- Object.getOwnPropertyNames
	ownKeys(target){}//拦截Object.keys, Object.getOwnPropertySymbols
2. Reflect
	- Reflect对象的方法与Proxy对象的方法一一对应
	- Reflect.get(obj, key) 获取键值
	- Reflect.set(obj, key, value) 设置新键值
	- Reflect.has(obj, key) 判断属性
	-  让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。
	- Reflect.ownKeys返回对象所有属性

### Promise对象
1. 初始化
	- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
	- Promise新建后立即执行
```
var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
2. resolve函数
	- 将Promise对象的状态从“未完成”变为“成功”（即从 Pending 变为 Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
3. reject函数
	- 将Promise对象的状态从“未完成”变为“失败”（即从 Pending 变为 Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
4. then()
	- Promise实例生成以后，可以用then方法分别指定Resolved状态和Rejected状态的回调函数。
	- 接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的状态变为Rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。
	```
	promise.then(function(value) {
	  // success
	}, function(error) {
	  // failure
	});
	```
	- 可以通过then接着调用下一个promise实例
	```
	new Promise().then().then()
	```
	- 调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例
5. catch()  捕捉错误
	```
	let ajax = function(num) {
		console.log('do it3');
		return new Promise(function(resolve, reject){
			if(num > 5) {
				resolve();
			} else {
				throw new Error('出错了');
			}
		})
	};
	ajax(1).then(function(){
		console.log('success log 6');
	}).catch(function(err){
		console.log('catch', err);
	})
	```
6. Promise.all()
	- 将多个 Promise实例包装成一个新的Promise实例
	- 只有当这些实例都加载完成，新实例才会完成
	- 这些实例的返回值组成一个数组，**传给新实例的回调函数**
	```
	function loadImg(src) {
		return new Promise((resolve, reject) => {
			let img = document.createElement('img');
			img.src = src;
			console.log('img');
			img.onload = function() {
				resolve(img);//调用resolve()，并把img传给回调函数
			}
			img.onError = function() {
				reject(err);
			}
		})
	}
	function showImgs(imgs) {
		imgs.forEach(function(img) {
			document.body.appendChild(img);
		})
	}
	Promise.all([
		loadImg('http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg'),
		loadImg('http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg'),
		loadImg('http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg')
		]).then(showImgs);//传入showImgs的是3个img组成的数组，loadImg()返回的实例的返回值是img？？
	```
7. Promise.race()
	- 将多个Promise实例，包装成一个新的Promise实例
	- 只要有一个实例先改变状态，就先把返回值传给新实例的回调函数

### Class 类
1. 定义
	- 定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。
	- 方法之间不需要逗号分隔，加了会报错。
	- 定义方式2种
	```
	class MyClass = {}
	const MyClass = class Me {}//表达式定义，类名是MyClass而不是Me，Me只在Class内部代码可用，指代当前类，Me可省略
	```
	- 类内部定义的方法，都是不可枚举的
	- 类的属性名，可以采用表达式
	- 类属于构造函数的另一种写法，构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
	- 不存在变量提升
2. 调用
	- 必须用new调用
	- 方法中的this指向类的实例
3. constructor 
	- 类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加
	- prototype对象的constructor属性，直接指向类本身
4. 实例
	- 属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
	- 类的所有实例共享一个原型对象
5. Generator方法
	- 在方法前加星号*，表示这是一个Generator函数
6. 静态方法
	- static关键字，表示该方法不会被实例继承，而是通过类来调用
	- 父类的静态方法，可以被子类继承
7. 静态属性和实例属性
	- 静态属性指Class本身的属性，即Class.propName, 而不是在实例对象（this）上的属性
	- Class内部只有静态方法，没有静态属性
8. 类的继承
	8.1 extends关键字
	```
	class ColorPoint extends Point {}
	```
	8.2 super关键字
		8.2.1 当作函数使用时
			- 表示父类的构造函数，用来新建父类的this对象
			- 子类**必须在constructor方法中调用super方法**，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。	
			- super虽然代表了父类的构造函数，但是返回的是子类的实例，即super内部的this指的是子类
			- 	
		8.2.2 当作对象使用时
			- 在普通方法中，指向父类的原型对象
			- 在静态方法中，指向父类
	8.3 get和set
		- get prop(){}//获取prop属性
		- set prop(val){}//重新对prop属性赋值

### Iterator 遍历器
1. 自定义布置iterator接口
2. for...of 
	- 具有iterator接口的数据结构，才可以用for...of循环遍历它的**成员**。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
	- 可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

### Generator 函数
1. 调用Generator后，函数并不执行，返回一个指向内部状态的指针对象，即遍历器对象
	- 分段执行，yield是暂停执行的标记
	- 再调用遍历器对象的next方法，使得指针移向下一个状态
2. yield
	- 定义不同的内部状态
3. 利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
	```
	obj[Symbol.interator] = function* (){}
	```	
	-  定义obj[symbol.interator]为一个Generator,执行后得到遍历器对象
4. 应用
	4.1 长轮询，每隔一段时间向服务端请求数据，直到得到符合条件的数据
		- Promise中，1s后执行resolve回调函数，传入参数（从服务端获取的数据），判断是否符合条件，不符合再执行genertor()

### Decorator 类的修饰器
1. 修饰器参数
	- 第一个参数，是所要修饰的目标类
	- 第二个是所要修饰的属性名
	- 第三个是该属性的描述对象
2. 使用
	- 在class里面使用
	- 在class外面使用：只能是静态属性,如果想添加实例属性，可以通过目标类的prototype对象操作。
3. 第三方库 core-decorators

### 模块化
1. import引入  export输出