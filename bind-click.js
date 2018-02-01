(function() {
  'use strict';

  var addCssLock = false;
  var addCss = function () {
    if ( Modernizr.touchevents === 'undefined' ) {
      new Error('bind-click.js requires that Modernizr be present with the touchevents detect');
    }
    var css = '.touchevents .x-bind-click { cursor: pointer; }';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if ( style.styleSheet ) {
      style.styleSheet.cssText = css;
    }
    else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    addCssLock = true;
  };

  var bindClick = function (element,callback) {
    if ( !addCssLock ) {
      addCss();
    }
    if ( undefined === typeof element || !element ) {
      return false;
    }
    element.classList.add('x-bind-click');
    element.addEventListener('click',callback);
  };

  if ( typeof module !== 'undefined' && typeof module.exports !== 'undefined' ) {
    module.exports = bindClick;
  }
  else {
    if ( typeof define === 'function' && define.amd )  {
      define([], function() {
        return bindClick;
      });
    }
    else {
      window.bindClick = bindClick;
    }
  }
})();
