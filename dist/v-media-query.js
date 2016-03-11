(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vMediaQuery"] = factory();
	else
		root["vMediaQuery"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var vue = undefined;
	var _vms = {};
	var _nameSpace = {
	  methods: '$mq',
	  variables: '$mv'
	};
	var _methods = { expr: expr, below: below, above: above, beyond: beyond, between: between };
	var _mqData = {
	  created: function created() {
	    var root = this.$parent;
	
	    if (root) {
	      this.$set('$mq.resize', root[_nameSpace.methods].resize);
	    } else {
	      _vms[this._uid] = this;
	      vue.util.defineReactive(this[_nameSpace.methods], 'resize', 1);
	    }
	  }
	};
	
	exports.default = {
	  methods: _methods,
	  install: function install(Vue) {
	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _ref$methods = _ref.methods;
	    var methods = _ref$methods === undefined ? {} : _ref$methods;
	    var _ref$variables = _ref.variables;
	    var variables = _ref$variables === undefined ? {} : _ref$variables;
	    var _ref$nameSpace = _ref.nameSpace;
	    var nameSpace = _ref$nameSpace === undefined ? {} : _ref$nameSpace;
	
	    vue = Vue;
	    (0, _objectAssign2.default)(_nameSpace, nameSpace);
	
	    Vue.options = Vue.util.mergeOptions(Vue.options, _mqData);
	    Vue.prototype[_nameSpace.methods] = (0, _objectAssign2.default)({}, _methods, methods);
	    Vue.prototype[_nameSpace.variables] = variables;
	    initResize();
	  }
	};
	
	
	function initResize() {
	  var debounseResize = vue.util.debounce(function () {
	    Object.keys(_vms).forEach(function (key) {
	      return ++_vms[key][_nameSpace.methods].resize;
	    });
	  }, 150);
	
	  window.addEventListener('resize', debounseResize);
	}
	
	function getArgs(args) {
	  return args.length > 0 ? args.reverse() : args;
	}
	
	function prepare(val) {
	  return ('' + parseInt(val)).length === ('' + val).length ? val + 'px' : val;
	}
	
	function expr(expressionString) {
	  return matchMedia(expressionString).matches;
	}
	
	function below() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var _getArgs = getArgs(args);
	
	  var _getArgs2 = _slicedToArray(_getArgs, 2);
	
	  var value = _getArgs2[0];
	  var _getArgs2$ = _getArgs2[1];
	  var measurement = _getArgs2$ === undefined ? 'width' : _getArgs2$;
	
	  return matchMedia('(max-' + measurement + ': ' + prepare(value) + ')').matches;
	}
	
	function above() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  var _getArgs3 = getArgs(args);
	
	  var _getArgs4 = _slicedToArray(_getArgs3, 2);
	
	  var value = _getArgs4[0];
	  var _getArgs4$ = _getArgs4[1];
	  var measurement = _getArgs4$ === undefined ? 'width' : _getArgs4$;
	
	  return matchMedia('(min-' + measurement + ': ' + prepare(value) + ')').matches;
	}
	
	function between() {
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  var _getArgs5 = getArgs(args);
	
	  var _getArgs6 = _slicedToArray(_getArgs5, 2);
	
	  var value = _getArgs6[0];
	  var _getArgs6$ = _getArgs6[1];
	  var measurement = _getArgs6$ === undefined ? 'width' : _getArgs6$;
	
	  var _value = _slicedToArray(value, 2);
	
	  var minVal = _value[0];
	  var maxVal = _value[1];
	
	
	  return matchMedia('\n    (min-' + measurement + ': ' + prepare(minVal) + ') and\n    (max-' + measurement + ': ' + prepare(maxVal) + ')\n  ').matches;
	}
	
	function beyond() {
	  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    args[_key4] = arguments[_key4];
	  }
	
	  var _getArgs7 = getArgs(args);
	
	  var _getArgs8 = _slicedToArray(_getArgs7, 2);
	
	  var value = _getArgs8[0];
	  var _getArgs8$ = _getArgs8[1];
	  var measurement = _getArgs8$ === undefined ? 'width' : _getArgs8$;
	
	  var _value2 = _slicedToArray(value, 2);
	
	  var minVal = _value2[0];
	  var maxVal = _value2[1];
	
	
	  return matchMedia('\n    (min-' + measurement + ': ' + prepare(maxVal) + '),\n    (max-' + measurement + ': ' + prepare(minVal) + ')\n  ').matches;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=v-media-query.js.map