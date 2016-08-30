'use strict';

var eventListener = require('event-listener'),
    scrollTop = require('scroll-top');

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
