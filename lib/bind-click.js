const addCSS = require('add-css')

function _prepare(element,callback) {
  element.classList.add('x-bind-click')

  document.querySelector('body')
    .addEventListener('click',function (e) {
      if ( e.target === element ) {
        callback(e)
      }
    })
}

let _cssHackLock = false
function _cssHack() {
  if ( !_cssHackLock ) {
    addCSS('.touchevents .x-bind-click { cursor: pointer }')
  }
  _cssHackLock = true
}

function bindClick (select,callback) {
  _cssHack()

  let target
  if ( typeof select === 'string' ) {
    target = document.querySelectorAll(select)
  }
  else {
    target = select
  }

  if ( !target || typeof target === 'undefined' ) {
    return false
  }

  if ( NodeList.prototype.isPrototypeOf(target) ) {
    target.forEach(function (el) {
      _prepare(el,callback)
    })
  }
  else {
    _prepare(target,callback)
  }
}

module.exports = bindClick
