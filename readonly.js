/**
 * Readonly v2.1.1
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on https://github.com/haggen/readonly
 */
;(function(root, undefined) {

  'use strict';

  var shammed = function(target) {
    return target.nextElementSibling && target.nextElementSibling.getAttribute('data-sham') === target.name;
  };

  var readonly = function(target) {
    target.setAttribute('disabled', true);
    target.setAttribute('readonly', true);

    target.classList.add('readonly');

    var checkable = (target.type === 'checkbox' || target.type === 'radio');
    if (checkable && target.checked !== true) {
      return;
    }

    if (!shammed(target)) {
      var sham = document.createElement('input');

      sham.name = target.name;
      sham.type = 'hidden';
      sham.value = target.value;
      sham.setAttribute('data-sham', target.name);

      target.parentNode.insertBefore(sham, target.nextSibling);
      target.sham = sham;
    }
  };

  var editable = function(target) {
    target.removeAttribute('disabled');
    target.removeAttribute('readonly');

    target.classList.remove('readonly');

    if (shammed(target)) {
      target.parentNode.removeChild(target.nextElementSibling);
    }
  };

  var toggle = function(target, force) {
    if (typeof target === 'string') {
      target = document.querySelectorAll(target);
    }

    if (target instanceof HTMLElement) {
      target = [target];
    }

    [].forEach.call(target, function(element) {
      var value = !element.getAttribute('readonly');

      if (force === undefined ? value : force) {
        readonly(element);
      } else {
        editable(element);
      }
    });
  };

  if (root.jQuery !== undefined) {
    root.jQuery.fn.readonly = function(value) {
      return this.each(function() {
        toggle(this, value);
      });
    };
  }

  root.readonly = toggle;
})(this);
