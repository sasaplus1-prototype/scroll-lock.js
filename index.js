'use strict';

var scrollTop = require('scroll-top');

var html = document.documentElement,
    body = document.body;

/**
 * scroll lock by position property
 *
 * @return {Object}
 */
function lockFixed() {
  var top, previousProps;
  
  top = scrollTop.get();

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
  var previousProps = {
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
