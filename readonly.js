/**
 * Readonly v2.0.1
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on https://github.com/haggen/readonly
 */
;(function(undefined) {

  var readonly = function(target) {
    target.setAttribute('disabled', true);
    target.setAttribute('readonly', true);
    target.classList.add('readonly');

    if (!hasSham(target)) {
      var sham = document.createElement('input');

      sham.name = target.name;
      sham.type = 'hidden';
      sham.value = target.value;
      sham.setAttribute('data-sham', target.name);

      target.parentNode.insertBefore(sham, target.nextSibling);
    }
  };

  var editable = function(target) {
    target.removeAttribute('disabled');
    target.removeAttribute('readonly');
    target.classList.remove('readonly');

    if(hasSham(target)) {
      target.parentNode.removeChild(target.nextElementSibling);
    }
  };

  var toggle = function(target, value) {
    console.log(target, value)

    if(typeof target === 'string') {
      target = document.querySelectorAll(target);
    }

    if(target instanceof HTMLElement) {
      target = [target];
    }

    [].forEach.call(target, function(el) {
      if(value === undefined ? !el.getAttribute('data-readonly') : value) {
        readonly(el);
      } else {
        editable(el);
      }
    });
  }

  var hasSham = function (target) {
    return target.nextElementSibling && target.nextElementSibling.getAttribute('data-sham') === target.name;
  }

  if(this.jQuery !== undefined) {
    this.jQuery.fn.readonly = function(value) {
      return this.each(function() {
        toggle(this, value);
      });
    };
  }

  this.readonly = toggle;

})(this);