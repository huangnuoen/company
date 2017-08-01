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

	var _Class = __webpack_require__(2);

	var _Class2 = _interopRequireDefault(_Class);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	{
		var Point = function () {
			function Point(x, y) {
				_classCallCheck(this, Point);

				this.x = x;
				this.y = y;
			}

			_createClass(Point, [{
				key: 'toString',
				value: function toString() {
					return '(i am' + this.x + this.y + ')';
				}
			}]);

			return Point;
		}();

		var a = new Point('pretty', 'girl');
		console.log(a.toString());
	}
	{
		var Parent = function () {
			function Parent() {
				var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'es6';

				_classCallCheck(this, Parent);

				this.name = name;
			}

			_createClass(Parent, [{
				key: 'longName',
				get: function get() {
					return 'first Name' + this.name;
				},
				set: function set(value) {
					this.name = value;
				}
			}]);

			return Parent;
		}();

		var Child = function (_Parent) {
			_inherits(Child, _Parent);

			function Child() {
				var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'child';

				_classCallCheck(this, Child);

				//即可传入参数
				var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

				_this.type = 'son';
				return _this;
			}

			return Child;
		}(Parent);

		var v = new Parent('v');
		console.log(new Child());
		console.log(v.longName);
		v.longName = 'hello';
		console.log(v.longName);
	}
	{
		var _Parent2 = function () {
			function _Parent2() {
				var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'es6';

				_classCallCheck(this, _Parent2);

				this.name = name;
			}

			_createClass(_Parent2, null, [{
				key: 'tell',
				value: function tell() {
					console.log('tell');
				}
			}]);

			return _Parent2;
		}();

		_Parent2.tell();
	}

/***/ })
/******/ ]);