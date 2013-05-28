# Readonly.js

> Make form controls - even `<select>` - readonly.

## About:

The `<select>` element does not accept `readonly` attribute. **Readonly** is a wrapper that fix this.

## Usage:

With no arguments, `#readonly` toggles the state of the element.

```javascript
$('input').readonly();
```

You you can also force a state by passing `true` or `false`.

```javascript
$('input').readonly(true);
```

## How does it work:

When called upon a `<input>` or `<textarea>` the plugin simply changes its `readonly` attribute.

The magic happens when we call it upon a `<select>`. To make it work we create a sham, a hidden input, right after the target, with the same name and value. Finally we disable the `<select>` to make it does not respond to the user's interaction.

## License

This project is licensed under [Attribution-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-sa/3.0/).

## Contribution

1. Fork it
2. Change it
3. Commit with brief yet meaningful description
4. Send pull request

Also, you could simply register an issue, or comment in one.
