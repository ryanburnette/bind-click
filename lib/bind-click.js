const addCSS = require('add-css')

const lock = false

function _prepare(element,callback) {
  element.classList.add('x-bind-click')
  element.addEventListener('click',e => callback(e))
}

function bindClick (element,callback) {
  if ( !lock ) {
    addCSS('.touchevents .x-bind-click { cursor: pointer }')
  }

  if ( typeof element === 'undefined' ) {
    return false
  }

  if ( element === null ) {
    return false
  }

  if ( typeof element.forEach === 'undefined' ) {
    _prepare(element,callback)
  }
  else {
    element.forEach(el => _prepare(el,callback))
  }
}

module.exports = bindClick
