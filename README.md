# Readonly.js

> Make form controls - even `<select>` - read-only.

## About

Won't your `<select>` elements accept the `readonly` attribute? **Readonly.js** is a lightweight wrapper to fix that.

## Usage

Now with Readonly.js 2.0 you can finally drop that old bugger jQuery. Or not, it's your call.

If you're using jQuery, calling `readonly` toggles the _editable_ state of an element.

```js
$('input, select').readonly();
```

You can also force the state by passing an additional argument; `true` for _read only_ or `false` for _editable_.

```js
$('input, select').readonly('input, select', true);
```

If you're not using jQuery, Readonly.js makes it a breeze:

```js
readonly('input, select');
```

```js
readonly('input, select', false);
```

The first argument can be:

- A selector.
- A single element.
- A collection of elements (Array or NodeList).
- A jQuery selection.

## Compatibility

Readonly.js requires support for the following DOM methods:

- `nextElementSibling`
- `querySelectorAll`
- `classList`

Which should be available in the recent versions of Chrome, Firefox, Opera, Safari and since IE11.

## Web Standards

Have you wondered why the `readonly` attribute doesn't work in `<select>` element? Well, the whole thing is more complicated then that, but you can read all about it here: https://github.com/whatwg/html/issues/2311. You can also contribute to the web standards by joining in the conversation and making your point in favor of this feature.

## License

This project is licensed under MIT. See [LICENSE.md](LICENSE.md) for full notice.
