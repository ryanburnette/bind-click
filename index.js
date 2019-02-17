;(function() {
  var lockCSS = false;

  function bindClick(elements,callback,events) {
    if (typeof events === 'string') {
      events = [events];
    }

    if (!events) {
      events = ['click'];
    }

    if (typeof elements !== 'string' && !Node.prototype.isPrototypeOf(elements) && !NodeList.prototype.isPrototypeOf(elements)) {
      throw new Error('elements must be a selector string, Node, or NodeList');
    }

    if (!lockCSS) {
      addCSS('.touchevents .x-bind-click { cursor: pointer }');
      lockCSS = true;
    }

    return document.body.addEventListener(events,function (e) {
      var _elements;

      if (typeof elements === 'string') {
        _elements = document.querySelectorAll(elements);
      }
      else {
        _elements = elements;
      }

      if (Node.prototype.isPrototypeOf(_elements)) {
        _bindClick(_elements,callback,e);
      }

      if (NodeList.prototype.isPrototypeOf(_elements)) {
        [].forEach.call(_elements,function (el) {
          _bindClick(el,callback,e);
        });
      }
    });
  }

  function _bindClick(el,callback,e) {
    if (e.target === el) {
      return callback(e);
    }

    collectParentNodes(e.target).forEach(function (pel) {
      if (pel === el) {
        return callback(e);
      }
    });
  }

  function collectParentNodes(el) {
    var arr = [];

    while (el.parentNode) {
      arr.push(el);
      el = el.parentNode;
    }

    return arr;
  }

  function addCSS(css) {
    var head = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style')
    style.type = 'text/css'
    if ( style.styleSheet ) {
      style.styleSheet.cssText = css
    }
    else {
      style.appendChild(document.createTextNode(css))
    }
    head.appendChild(style)
  }

  function addClass(el,className) {
    if (el.classList) {
      el.classList.add(className);
    }
    else {
      el.className += ' ' + className;
    }
  }
  
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = bindClick;
  }
  else {
    if (typeof define === 'function' && define.amd) {
      define([], function() {
        return bindClick;
      });
    }
    else {
      window.bindClick = bindClick;
    }
  }
})();
