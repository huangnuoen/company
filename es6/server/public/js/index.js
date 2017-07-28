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

	var _lesson = __webpack_require__(2);

	var _lesson2 = _interopRequireDefault(_lesson);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _templateObject = _taggedTemplateLiteral(['i am ', ', ', ' '], ['i am ', ', ', ' ']);

	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

	{
		var regex = new RegExp('xyz', 'i');
		var regex2 = new RegExp(/xyz/i);

		console.log(regex.test('xyz123'), regex2.test('234x'));

		var regex3 = new RegExp(/xyz/ig, 'i'); //第二个修饰符会覆盖前一个
		console.log(regex3.flags);
	}
	{
		var s = 'bbb_bb_b';
		var a1 = /b+/g;
		var a2 = new RegExp('b+', 'y');
		console.log('one:', a1.exec(s), a2.exec(s));
		console.log('two:', a1.exec(s), a2.exec(s));
	}

	{
		console.log('a', 'a');
		console.log('s', '\uD842\uDFB7');
		var _s = '𠮷';
		console.log(_s.length);
	}

	{
		var name = 'List';
		var info = 'hello world';
		var m = 'i am ' + name + ', ' + info;
		console.log(m);
	}

	{
		var date1 = '12'.padStart(7, '2017-0');
		var date2 = '2'.padStart(7, '2017-0');

		console.log(date1, date2);
	}

	{
		var abc = function abc(s) {
			console.log(s);
			return s;
		};

		var user = {
			name: 'list',
			info: 'hello world'
		};
		console.log(abc(_templateObject, user.name, user.info));
	}

/***/ })
/******/ ]);