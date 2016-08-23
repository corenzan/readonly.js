# Readonly.js

> Make form controls - even `<select>` - read-only.

## About:

Won't your `<select>` elements accept the `readonly` attribute? **Readonly.js** is a lightweight wrapper to fix that. Not only that, but you can make anything read-only with Readonly.js. Really. :D

## Usage:

Now with Readonly.js 2.0 you can finally drop that old bugger jQuery. Or not, it's your call.

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

```javascript
readonly('input, select', false);
```

The first argument can be:

- A selector.
- A single element.
- A collection of elements (Array or NodeList).
- A jQuery selection.

## License

This project is licensed under [MIT](LICENSE).

## Contribution

1. Fork it and make some changes.
2. Commit the changes, explaining what you did and why.
4. Send a pull request.
5. Thank you, you're awesome! ;)
