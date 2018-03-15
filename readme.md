# bind-click

A function to bind the click event with a couple of common problems worked out.

## Problems Solved

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
