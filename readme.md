# bind-click

A function to bind the click event with a couple of common problems worked out.

## Problems Solved

- Fails gracefully if no elements are selected by the query.
- Solves click issue on some older iOS touch screens. https://bugs.jquery.com/ticket/5677

What other issues could be solved by this library? Please contribute.

## Usage

```javascript
var bindClick = require('bind-click');
bindClick(document.querySelector('.button'),function myBindClickHandler (event,element) { /* do some stuff */ });
```
