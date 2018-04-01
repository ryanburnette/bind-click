const css = require('add-css')
const live = require('live-dom')

function bindClick(select,callback,events=['click','touchstart']) {
  _bindClick(select,callback,events)
}

function _bindClick(select,callback,events) {
  if ( typeof select === 'string' ) {
    return live(select,el => _bindClick(el,callback,events))
  }

  if ( _isNodeish(select) ) {
    return _bindHandlers(select,callback,events)
  }

  throw new Error('select must be a query string, Node, or NodeList')
}

function _bindHandlers(select,callback,events) {
  _addClasses(select)
  let throttledCallback = _throttle(callback,150)
  events.forEach(eventName => {
    _select(select).forEach(el => {
      el.addEventListener(eventName,throttledCallback)
    })
  })
}

function _select(select) {
  let arr = []
  let allowable = false
  if ( _isNode(select) ) {
    allowable = true
    arr.push(select)
  }
  if ( _isNodeList(select) ) {
    allowable = true
    select.forEach(el => arr.push(el))
  }

  if ( allowable ) {
    return arr
  }
  else {
    throw new Error('select must be a Node or a NodeList')
  }
}

function _isNode(select) {
  return Node.prototype.isPrototypeOf(select) ? true : false
}

function _isNodeList(select) {
  return NodeList.prototype.isPrototypeOf(select) ? true : false
}

function _isNodeish(select) {
  return (_isNode(select) || _isNodeList(select)) ? true : false
}

let _addCSSlock = false
function _addCSS() {
  if ( !_addCSSlock ) {
    css('.touchevents .x-bind-click { cursor: pointer }')
  }
}

function _addClasses(select) {
  if ( _isNode(select) ) {
    return select.classList.add('x-bind-click')
  }
  if ( _isNodeList(select) ) {
    return select.forEach(el => _addClasses(el))
  }
}

function _throttle(callback,delay) {
  let lock = false
  return function () {
    if ( !lock ) {
      callback.apply(null,arguments)
      lock = true
      setTimeout(function () {
        lock = false
      },delay)
    }
  }
}

module.exports = bindClick
