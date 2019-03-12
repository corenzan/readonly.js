# Readonly.js

> Make form controls - even `<select>` - read-only.

## About

**Readonly.js** is a lightweight wrapper to fix the inconsistency of the `readonly` attribute in form controls. According to [current specifications](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-readonly) the attribute will be ignored in certain input types, and is completely void in `<select>` elements. This little helper aims to fix that. If you're curious to know more read the [Web Standards](#web-standards) section.

## Upgrade to 3.x.x

If you're coming from older versions take note:

- The control no longer gets a class added to it. You should use the attribute selector instead. e.g. `select[readonly] { ... }`
- Now you can keep the actual control and its surrogate (formerly known as _sham_) in sync by dispatching a `change` event on the element. .e.g `input.dispatchEvent(new Event('change'))`. This will make sure that changes to `name` and/or `value` made via JavaScript will take effect.

## Compatibility

Version 3.0.0 was rewritten with a modern syntax but we're using Babel to transpile it into a more compatible JavaScript syntax wise. We also make use of some relatively newer browser APIs like `querySelectorAll`. Anything newer than IE11 should be fine but if you run into issues please submit an issue so we can look into it.

## Usage

Only a single function is exported: `readonly`. e.g.

```js
readonly('input, select');
```

This will toggle the read-only state of matching elements.

The first argument can be either:

- A selector.
- A single element.
- A collection of elements (_Array_ or _NodeList_).

You can also force a state by passing an additional argument; `true` for _read-only_ or `false` for _editable_.

```js
readonly('input, select', true);
```

If you're using **jQuery** it'll be installed as a plugin.

```js
$('input, select').readonly(true);
```

## Web Standards

Have you ever wondered why the `readonly` attribute doesn't work in `<select>` elements? Well, the whole thing is more complicated then one might think, but you can read all about it here: https://github.com/whatwg/html/issues/2311. You also could help advance the web standards by leaving a comment with why such feature would be useful to you.

## License

The MIT License © 2013 Arthur Corenzan. See [LICENSE.md](LICENSE.md) for full notice.
