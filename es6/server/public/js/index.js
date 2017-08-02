/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _Promise = __webpack_require__(2);

	var _Promise2 = _interopRequireDefault(_Promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	{
		var ajax = function ajax(callback) {
			console.log('do it');
			setTimeout(function () {
				callback && callback.call();
			}, 1000);
		};
		ajax(function () {
			console.log('timeout1');
		});
	}
	{
		var _ajax = function _ajax() {
			console.log('do it 2');
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					resolve();
				}, 1000);
			});
		};
		_ajax().then(function () {
			console.log('promise', 'success');
		});
	}
	{
		var _ajax2 = function _ajax2() {
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					resolve();
				}, 1000);
			});
		};
		_ajax2().then(function () {
			console.log('A');
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					resolve();
				}, 1000);
			});
		}).then(function () {
			console.log('B');
		});
	}
	{
		var _ajax3 = function _ajax3(num) {
			console.log('do it3');
			return new Promise(function (resolve, reject) {
				if (num > 5) {
					resolve();
				} else {
					throw new Error('出错了');
				}
			});
		};
		_ajax3(1).then(function () {
			console.log('success log 6');
		}).catch(function (err) {
			console.log('catch', err);
		});
	}
	{
		//Promise应用,同时加载图片
		var loadImg = function loadImg(src) {
			return new Promise(function (resolve, reject) {
				var img = document.createElement('img');
				img.src = src;
				console.log('img');
				img.onload = function () {
					resolve(img); //调用resolve()，并把img传给回调函数
				};
				img.onError = function () {
					reject(err);
				};
			});
		};

		var showImgs = function showImgs(imgs) {
			imgs.forEach(function (img) {
				document.body.appendChild(img);
			});
		};

		Promise.all([loadImg('http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg'), loadImg('http://img3.redocn.com/tupian/20150430/mantenghuawenmodianshiliangbeijing_3924704.jpg'), loadImg('http://img3.redocn.com/tupian/20150416/jingmeihuawenbiankuangsucai_4019518.jpg')]).then(showImgs); //传入showImgs的是3个img组成的数组，loadImg()返回的实例的返回值是img？？
	}
	{
		//加载最先完成加载的图片
		var _loadImg = function _loadImg(src) {
			return new Promise(function (resolve, reject) {
				var img = document.createElement('img');
				img.src = src;
				console.log('img');
				img.onload = function () {
					resolve(img); //调用resolve()，并把img传给回调函数
				};
				img.onError = function () {
					reject(err);
				};
			});
		};

		var _showImgs = function _showImgs(img) {
			var p = document.createElement('p');
			p.appendChild(img);
			document.body.appendChild(p);
		};

		Promise.race([_loadImg('http://img06.tooopen.com/images/20160712/tooopen_sy_170083325566.jpg'), _loadImg('http://img3.redocn.com/tupian/20150430/mantenghuawenmodianshiliangbeijing_3924704.jpg'), _loadImg('http://img3.redocn.com/tupian/20150416/jingmeihuawenbiankuangsucai_4019518.jpg')]).then(_showImgs);
	}

/***/ })
/******/ ]);