# bind-click

Attach a function to the click event while handling some edge cases that I like
to address.

## Notes

- Pass in a Node, NodeList, or a string to select the target element
- Fails gracefully if no elements are selected
- If a string selector is passed in, the DOM is queried each time giving a "jQuery live"-ish behavior
- Default event is click
- Solves [click issue on some older iOS touch screens](https://bugs.jquery.com/ticket/5677) 

## Basic Usage

```javascript
bindClick(document.querySelectorAll('.button'),function (e) {
  console.log(e);
});
```

## Requirements

- Requires the [Modernizr touchevents detect](https://modernizr.com/download?touchevents-setclasses&q=touchev) with `setClasses` enabled.
