const addCSS = require('add-css')
const $live = require('live-dom')
const throttle = require('lodash.throttle')

const body = document.querySelector('body')

const Events = ['click','touchstart']

function _createHandler(element,callback) {
  return function (event) {
    console.log(event)
    _parents(event.target).forEach(el => {
      if ( el === element ) {
        callback(event)
      }
    })
  }
}

function _prepare(element,callback) {
  element.classList.add('x-bind-click')
  Events.forEach(eventName => {
    let _handler = _createHandler(element,callback)
    body.addEventListener(eventName,event => {
      _handler(event)
    })
  })
}


function bindClick (selector,callback) {
  _cssHack()

  if ( !selector || typeof selector === 'undefined' ) {
    return false
  }

  if ( Node.prototype.isPrototypeOf(selector) ) {
    return _prepare(selector,callback)
  }

  if ( NodeList.prototype.isPrototypeOf(selector) ) {
    return selector.forEach(node => _prepare(node,callback))
  }

  if ( typeof selector === 'string' ) {
    return $live(selector, function (el) {
      bindClick(el,callback)
    })
  }
}

let _cssHackLock = false
function _cssHack() {
  if ( !_cssHackLock ) {
    addCSS('.touchevents .x-bind-click { cursor: pointer }')
  }
  _cssHackLock = true
}

function _parents(node) {
  let parents = []
  while ( node ) {
    parents.unshift(node);
    node = node.parentNode;
  }
  return parents
}

module.exports = bindClick
