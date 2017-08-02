{
	let ajax = function(callback) {
		console.log('do it');
		setTimeout(function(){
			callback && callback.call();
		}, 1000);
	}
	ajax(function(){
		console.log('timeout1');
	})
}
{
	let ajax = function(){
		console.log('do it 2');
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve()
			}, 1000);
		})
	}
	ajax().then(function(){
		console.log('promise', 'success');
	})
}
{
	let ajax = function(){
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve()
			}, 1000);
		})
	}
	ajax().then(function(){
		console.log('A');
		return new Promise(function(resolve, reject){
			setTimeout(function(){resolve()}, 1000)
		})
	})
		.then(function(){
		console.log('B');
	})
}
{
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
}
{
	//Promise应用,同时加载图片
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
		loadImg('http://img3.redocn.com/tupian/20150430/mantenghuawenmodianshiliangbeijing_3924704.jpg'),
		loadImg('http://img3.redocn.com/tupian/20150416/jingmeihuawenbiankuangsucai_4019518.jpg')
		]).then(showImgs);//传入showImgs的是3个img组成的数组，loadImg()返回的实例的返回值是img？？
}
{
	//加载最先完成加载的图片
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
	function showImgs(img){
		let p = document.createElement('p');
		p.appendChild(img);
		document.body.appendChild(p);
	}
	Promise.race([
		loadImg('http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg'),
		loadImg('http://img3.redocn.com/tupian/20150430/mantenghuawenmodianshiliangbeijing_3924704.jpg'),
		loadImg('http://img3.redocn.com/tupian/20150416/jingmeihuawenbiankuangsucai_4019518.jpg')
		]).then(showImgs);
}