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

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	{
		var arr = Array.of(3, 4, 7, 9, 11);
		var arr1 = Array.of();

		console.log(arr1);
	}
	{
		var p = document.querySelectorAll('p');
		var pArr = Array.from(p);
		pArr.forEach(function (item) {
			console.log(item.textContent);
		});
	}
	{
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = [3, 5, 7].keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var index = _step.value;

				console.log(index);
			}
			// for(let value of [3, 5, 7].values()){
			// 	console.log(value);
			// }
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = [3, 5, 7].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _step2$value = _slicedToArray(_step2.value, 2),
				    i = _step2$value[0],
				    val = _step2$value[1];

				console.log(i, val);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}
	}
	{
		var test = function test(x) {
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'world';

			console.log('默认值', x, y);
		};

		test('hello', 'girl');
		test('hello');
	}
	{
		var test2 = function test2(x) {
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;

			console.log('作用域', x, y);
		};

		var x = 'test';

		test2('hi');
	}
	{
		//指定参数默认值为一个空对象，设置了解构赋值的默认值，
		var m1 = function m1() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref$x = _ref.x,
			    x = _ref$x === undefined ? 0 : _ref$x,
			    _ref$y = _ref.y,
			    y = _ref$y === undefined ? 0 : _ref$y;

			return [x, y];
		};
		//指定参数的默认值是一个有具体属性的对象，不指定解构赋值的默认值，在没有指定参数的情况下，参数的默认值才会生效


		var m2 = function m2() {
			var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
			    x = _ref2.x,
			    y = _ref2.y;

			return [x, y];
		};

		// 函数没有参数的情况


		m1(); // [0, 0]
		m2(); // [0, 0]

		// x有值，y无值的情况
		console.log(m1({ x: 3 })); //[3, 0]
		console.log(m2({ x: 3 })); //[3, undefined]

		// x和y都无值的情况
		m1({}); // [0, 0];
		m2({}); // [undefined, undefined]
	}
	{
		var arrow2 = function arrow2() {
			return 5;
		};
		var arrow = function arrow(v) {
			return 2 * v;
		};
		// function arrow(v) {
		// 	return 2*v;
		// }
		console.log('arrow', arrow(3));
	}

/***/ })
/******/ ]);