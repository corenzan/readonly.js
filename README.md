# ReadOnlySelect

jQuery plugin to make `<select>` readonly.

## Minify:

Run `make`.

## Usage:

```javascript
var select = $('select');
```

Toggle readonly state:

```javascript
select.readonly();
```

Force enable or disable readonly state:

```javascript
select.readonly(true);
select.readonly(false);
```

## How does it work:

Since HTML does not allow `<select>` to be readonly, the plugin creates a hidden input with the select's name and value and disable the select element.
