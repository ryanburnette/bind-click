const addCSS = require('add-css')
const $live = require('live-dom')
const throttle = require('lodash.throttle')

const body = document.querySelector('body')

const Events = ['click','touchstart']

function _handlerFunc (event,callback) {
  _family(event.target).forEach(el => {
    if ( el === element ) {
      callback(e)
    }
  })
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

function _parents(node) {
  if ( !Node.prototype.isPrototypeOf(node) ) {
    throw new Error('_parents() must receive a node as the argument')
  }

  let parents = []
  while ( node ) {
    parents.unshift(node);
    node = node.parentNode;
  }
  return parents
}

function _family(node) {
  let family = []
  family.push(node)
  family.push(_parents(node))
  return family
}

module.exports = bindClick
