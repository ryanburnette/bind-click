const addCSS = require('add-css')
const $live = require('live-dom')
const throttle = require('lodash.throttle')

const body = document.querySelector('body')

const Events = ['click','touchstart']

function _handlerFunc (event,callback) {
  if ( Array.isArray(event.path) ) {
    event.path.forEach(el => {
      if ( el === element ) {
        callback(e)
      }
    })
  }
}

const _handler = throttle(_handlerFunc,100)

function _prepare(element,callback) {
  element.classList.add('x-bind-click')
  Events.forEach(eventName => {
    body.addEventListener(eventName,event => {
      _handler(event,callback)
    })
  })
}


function bindClick (target,callback) {
  _cssHack()

  if ( !target || typeof target === 'undefined' ) {
    return false
  }

  if ( Node.prototype.isPrototypeOf(target) ) {
    return _prepare(target,callback)
  }

  if ( NodeList.prototype.isPrototypeOf(target) ) {
    return target.forEach(el => _prepare(el,callback))
  }

  if ( typeof target === 'string' ) {
    return $live(target, function (el) {
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

module.exports = bindClick
