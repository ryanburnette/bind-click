# bind-click

Attach a function to the click event. Handle some edge cases that I like to
address.

## Notes

- Pass in a Node, NodeList, or a string to select the target element.
- Fails gracefully if no elements are selected.
- If a string selector is passed in, [live-dom][1] is used to get the "jQuery live"-ish behavior.
- Default events are click and touchstart.
- Solves click issue on some older iOS touch screens. https://bugs.jquery.com/ticket/5677

## Usage

```javascript
const click = require('bind-click')
click('.button',e => console.log(e))
```

## Requirements

- Requires the [Modernizr touchevents detect](https://modernizr.com/download?touchevents-setclasses&q=touchev) with `setClasses` enabled.
- Requires [`NodeList.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach) to be present or polyfilled

[1]: https://github.com/kiltjs/live-dom
