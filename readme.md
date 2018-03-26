# bind-click

A function to bind the click event with a couple of common problems worked out.

## Problems Solved

- Adds a listener to the body and checks for a matching target.
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

Use `document.querySelector` or `document.querySelectorAll`.

If you're using jQuery, that's fine. Use `$('.el').get(0)`.

### `callback`

The function to call when the event fires. Receives the event as an argument.

## Requirements

- Requires the [Modernizr touchevents
  detect](https://modernizr.com/download?touchevents-setclasses&q=touchev) with
  `setClasses` enabled.
- Requires
  [`NodeList.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)
