# Readonly.js

> Make form controls - even `<select>` - read-only.

## About:

Won't your `<select>` elements accept the `readonly` attribute ? **Readonly.js** is a lightweight wrapper to fix that. Not only that, but you can make anything read-only with Readonly.js. Really. :D

## Usage:

Now with Readonly.js 2.0 you can finally drop that old bugger jQuery, or not, that's your call.

If you're using jQuery, calling `readonly` toggles the state of the element.

```javascript
$('input, select').readonly();
```

You can also force the state by passing an additional argument; `true` for `readonly` or `false` for `editable`.

```javascript
readonly('input, select', true);
```

If you're not using jQuery, Readonly.js makes it a breeze:

```javascript
readonly('input, select');
```

The first argument accepts:

- A selector
- A single element
- A collection of elements (Array or NodeList)
- And even a jQuery selection

## License

This project is licensed under [Attribution-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-sa/3.0/).

## Contribution

1. Fork it
2. Change it
3. Commit it, telling what you did and why
4. Send pull request
5. Thank you, you're awesome
