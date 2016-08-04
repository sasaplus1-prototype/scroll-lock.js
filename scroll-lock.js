/*!
 * @license scroll-lock.js Copyright(c) 2016 sasa+1
 * https://github.com/sasaplus1-prototype/scroll-lock.js
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrollLock"] = factory();
	else
		root["scrollLock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var scrollTop = __webpack_require__(1);

	var html, body;

	/**
	 * scroll lock by position property
	 *
	 * @return {Object}
	 */
	function lockFixed() {
	  var top, previousProps;

	  top = scrollTop.get();

	  body || (body = document.body);

	  previousProps = {
	    top: body.style.top,
	    width: body.style.width,
	    position: body.style.position
	  };

	  body.style.top = '-' + top + 'px';
	  body.style.width = '100%';
	  body.style.position = 'fixed';

	  return previousProps;
	}

	/**
	 * scroll unlock for position property
	 *
	 * @param {Object} [previousProps]
	 */
	function unlockFixed(previousProps) {
	  previousProps || (previousProps = {});

	  body || (body = document.body);

	  body.style.top = previousProps.top || '';
	  body.style.width = previousProps.width || '';
	  body.style.position = previousProps.position || '';
	}

	/**
	 * scroll lock by overflow property
	 *
	 * @return {Object}
	 */
	function lockOverflow() {
	  var previousProps;

	  html || (html = document.documentElement);
	  body || (body = document.body);

	  previousProps = {
	    htmlOverflow: html.style.overflow,
	    bodyOverflow: body.style.overflow
	  };

	  html.style.overflow = 'hidden';
	  body.style.overflow = 'hidden';

	  return previousProps;
	}

	/**
	 * scroll unlock for overflow property
	 *
	 * @param {Object} [previousProps]
	 */
	function unlockOverflow(previousProps) {
	  previousProps || (previousProps = {});

	  html || (html = document.documentElement);
	  body || (body = document.body);

	  html.style.overflow = previousProps.htmlOverflow || '';
	  body.style.overflow = previousProps.bodyOverflow || '';
	}

	/**
	 * scroll lock
	 *
	 * @param {String} [type]
	 * @return {Object}
	 */
	function lock(type) {
	  switch (type) {
	    case 'overflow':
	      return lockOverflow();
	    case 'fixed':
	    case 'position':
	    default:
	      return lockFixed();
	  }
	}

	/**
	 * scroll unlock
	 *
	 * @param {String} [type]
	 * @param {Object} [previousProps]
	 */
	function unlock(type, previousProps) {
	  if (
	    type !== null &&
	    typeof type === 'object' &&
	    typeof previousProps === 'undefined'
	  ) {
	    previousProps = type;
	    type = void 0;
	  }

	  switch (type) {
	    case 'overflow':
	      unlockOverflow(previousProps);
	      break;
	    case 'fixed':
	    case 'position':
	    default:
	      unlockFixed(previousProps);
	  }
	}

	module.exports = {
	  lock: lock,
	  unlock: unlock
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var db, dd;

	function get() {
	  var result;

	  if (window.pageYOffset !== void 0) {
	    result = window.pageYOffset;
	  } else {
	    db || (db = document.body);
	    dd || (dd = document.documentElement);

	    result = dd.scrollTop || db.parentNode.scrollTop || db.scrollTop;
	  }

	  return result;
	}

	function set(value) {
	  db || (db = document.body);
	  dd || (dd = document.documentElement);

	  db.scrollTop = value;
	  dd.scrollTop = value;
	}

	module.exports = {
	  get: get,
	  set: set
	};


/***/ }
/******/ ])
});
;