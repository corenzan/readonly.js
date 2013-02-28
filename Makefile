all: readonlyselect.js
	@head -6 readonlyselect.js > readonlyselect.min.js
	@curl -s -d output_info=compiled_code --data-urlencode "js_code@readonlyselect.js" http://closure-compiler.appspot.com/compile >> readonlyselect.min.js
