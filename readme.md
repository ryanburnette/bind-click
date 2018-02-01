# bind-click

A function to bind the click event with a couple of common problems worked out.

## Problems Solved

- Fails gracefully if no elements are selected by the query.
- Solves click issue on some older iOS touch screens.

What other issues could be solved by this library? Please contribute.

## Usage

```javascript
const bindClick = require('bind-click');
bindClick(document.querySelector('.button'),(event,element) => { /* do stuff */ });
```
