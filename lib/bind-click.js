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


function bindClick (target,callback) {
  _cssHack()

  if ( Node.prototype.isPrototypeOf(target) ) {
    return _prepare(target,callback)
  }

  if ( NodeList.prototype.isPrototypeOf(target) ) {
    return target.forEach(el => _prepare(el,callback))
  }

  if ( typeof select === 'string' ) {
    target = document.querySelectorAll(select)
  }
  else {
    target = select
  }

  if ( !target || typeof target === 'undefined' ) {
    return false
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
