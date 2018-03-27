const addCSS = require('add-css')
const $live = require('live-dom')

function _prepare(element,callback) {
  element.classList.add('x-bind-click')

  document.querySelector('body')
    .addEventListener('click touchstart',function (e) {
      if ( Array.isArray(e.path) ) {
        e.path.forEach(el => {
          if ( el === element ) {
            callback(e)
          }
        })
      }
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
