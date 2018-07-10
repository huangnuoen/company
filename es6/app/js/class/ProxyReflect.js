{
	let obj = {
		time: '2017-07-31',
		name: 'net',
		_r: 123
	};
	let monitor = new Proxy(obj, {
		get(target, key){
			return target[key].replace('2017', '2018');
		},
		set(target, key, value){
			if (key === 'name') {
				return target[key] = value;
			} else {
				return target[key];
			}
		},
		has(target, key) {
			if(key === 'name') {
				return target[key];
			} else {
				return false;
			}
		},
		deleteProperty(target, key){
			if(key.indexOf('_') > -1) {
				delete target[key];
				return true;
			} else {
				return target[key];
			}
		},
		ownKeys(target) {
			return Object.keys(target).filter(item => item!= 'time')
		}
	});
	console.log(obj.time, monitor);
	monitor.time = '2019';
	monitor.name = 'Mike';
	console.log(obj.time, monitor);
	console.log('name' in monitor, 'time' in monitor);

	// delete monitor._r;
	// delete monitor.time;
	// console.log(monitor);
	console.log(Object.keys(monitor));
}
{
	let obj = {
		time: '2017-07-31',
		name: 'net',
		_r: 123
	};

	console.log(Reflect.get(obj, 'time'));
}
{
	function validator(target, validator) {
		return new Proxy(target, {
			_validator: validator,
			set(target, key, value, proxy) {
				if(target.hasOwnProperty(key)){
					let va = this._validator[key];
					if(!!va(value))
				} else {
					throw Error(`不存在${key}`)
				}
			}
		})
	}
}