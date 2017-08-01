{
	class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
		toString() {
			return '(i am' + this.x + this.y + ')';
		}
	}
	let a = new Point('pretty', 'girl');
	console.log(a.toString());
}
{
	class Parent {
		constructor(name = 'es6') {
			this.name = name;
		}
		get longName() {
			return 'first Name' + this.name;
		}
		set longName(value) {
			this.name = value;
		}
	}
	class Child extends Parent {
		constructor(name = 'child') {
			super(name);//即可传入参数
			this.type = 'son';
		}
	}
	let v = new Parent('v');
	console.log(new Child());
	console.log(v.longName);
	v.longName = 'hello';
	console.log(v.longName);
}
{
	class Parent {
		constructor(name = 'es6') {
			this.name = name;
		}
		static tell(){
			console.log('tell');
		}
	}
	Parent.tell();
}
