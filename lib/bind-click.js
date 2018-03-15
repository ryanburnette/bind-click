import addCSS from 'add-css'

const lock = false

function prepare(element,callback) {
  element.classList.add('x-bind-click')
  element.addEventListener('click',e => callback(e))
}

export default function bindClick (element,callback) {
  if ( !lock ) {
    addCSS('.touchevents .x-bind-click { cursor: pointer }')
  }

  if ( typeof element === 'undefined' ) {
    return false
  }

  if ( typeof element.forEach === 'undefined' ) {
    prepare(element,callback)
  }
  else {
    element.forEach(el => prepare(el,callback))
  }
}
