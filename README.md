# scroll-lock.js

lock scroll

## Installation

```sh
$ npm install sasaplus1-prototype/scroll-lock.js
```

## Usage

via `require()`

```js
var scrollLock = require('scroll-lock');
```

via `<script>`

```html
<script src="scroll-lock.min.js"></script>
```

### Example

```js
scrollLock.lock('event');

setTimeout(function() {
  scrollLock.unlock('event');
}, 5000);
```

## Functions

### lock([type])

- `type`
  - `String`

`type` values are below:

- `event`
  - lock by cancel event
- `overflow`
  - lock by `overflow: hidden`
- `fixed` or `position` or any other
  - lock by `position: fixed`

lock scroll.

### unlock([type[, previousProps]])

- `type`
  - `String`
- `previousProps`
  - `Object`

unlock scroll.

## License

The MIT license.
