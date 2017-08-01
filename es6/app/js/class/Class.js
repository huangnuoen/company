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