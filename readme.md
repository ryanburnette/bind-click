# bind-click

A function to bind the click event with a couple of common problems worked out.

## Problems Solved

- Adds a listener to the body and checks for a matching target.
- Pass in a Node, NodeList, or selector string.
- Implements [live-dom][1] when a string selector is passed in.
- Fails gracefully if no elements are selected by the query.
- Solves click issue on some older iOS touch screens. https://bugs.jquery.com/ticket/5677

What other issues could be solved by this library? Please contribute.

## Usage

```javascript
import click from 'bind-click'
click(document.querySelector('.button'),e => console.log(e))
```

## API

### `selector`

Pass in a Node using `document.querySelector` or a NodeList using `document.querySelectorAll`.

Pass in a string for [live-dom][1] functionality.

If you're using jQuery, iterate the Array of Nodes and invoke for each.

```javascript
$('div').each(function () {
  click($(this).get(),function () {
    // do something
  })
})
```

### `callback`

The function to call when the event fires. Receives the event as an argument.

## Requirements

- Requires the [Modernizr touchevents
  detect](https://modernizr.com/download?touchevents-setclasses&q=touchev) with
  `setClasses` enabled.
- Requires
  [`NodeList.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)

[1]: https://github.com/kiltjs/live-dom
