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

	var eventListener = __webpack_require__(1),
	    scrollTop = __webpack_require__(2);

	var html, body;

	var wheelEventName;

	/**
	 * for canceling event
	 */
	function cancelEvent(event) {
	  event.preventDefault();
	}

	/**
	 * scroll lock by cancel event
	 */
	function lockEvent() {
	  wheelEventName || (
	    wheelEventName =
	      ('onwheel' in document) ? 'wheel' :
	      ('onmousewheel' in document) ? 'mousewheel' : 'DOMMouseScroll'
	  );

	  eventListener.on(window, 'scroll', cancelEvent);
	  eventListener.on(document, 'touchmove', cancelEvent);
	  eventListener.on(document, wheelEventName, cancelEvent);
	}

	/**
	 * scroll unlock by cancel event
	 */
	function unlockEvent() {
	  wheelEventName || (
	    wheelEventName =
	      ('onwheel' in document) ? 'wheel' :
	      ('onmousewheel' in document) ? 'mousewheel' : 'DOMMouseScroll'
	  );

	  eventListener.off(window, 'scroll', cancelEvent);
	  eventListener.off(document, 'touchmove', cancelEvent);
	  eventListener.off(document, wheelEventName, cancelEvent);
	}

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
	  var top;

	  previousProps || (previousProps = {});

	  body || (body = document.body);

	  if (/^-.*px$/.test(previousProps.top)) {
	    top = parseFloat(
	      previousProps.top
	        .replace(/^-/, '')
	        .replace(/px$/, '')
	    );
	  }

	  body.style.position = previousProps.position || '';
	  body.style.width = previousProps.width || '';
	  body.style.top = previousProps.top || '';

	  if (top) {
	    scrollTop.set(top);
	  }
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
	    case 'event':
	      return lockEvent();
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
	    case 'event':
	      unlockEvent();
	      break;
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

	var off = (typeof removeEventListener !== 'undefined') ?
	  function off(element, eventName, callback, capture) {
	    return element.removeEventListener(eventName, callback, capture);
	  } :
	  function off(element, eventName, callback) {
	    return element.detachEvent('on' + eventName, callback);
	  };

	var on = (typeof addEventListener !== 'undefined') ?
	  function on(element, eventName, callback, capture) {
	    return element.addEventListener(eventName, callback, capture);
	  } :
	  function on(element, eventName, callback) {
	    return element.attachEvent('on' + eventName, callback);
	  };

	function once(element, eventName, callback, capture) {
	  var handler = function() {
	    off(element, eventName, handler, capture);

	    switch (arguments.length) {
	      case 0:
	        return callback.call(this);
	      case 1:
	        return callback.call(this, arguments[0]);
	      case 2:
	        return callback.call(this, arguments[0], arguments[1]);
	      case 3:
	        return callback.call(this, arguments[0], arguments[1], arguments[2]);
	      default:
	        return callback.apply(this, arguments);
	    }
	  };

	  return on(element, eventName, handler, capture);
	}

	module.exports = {
	  off: off,
	  on: on,
	  once: once
	};


/***/ },
/* 2 */
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