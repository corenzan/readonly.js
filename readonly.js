/**
 * Readonly v2.0.0
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on https://github.com/haggen/readonly
 */
;(function(undefined) {

  function readonly(target, value) {
    if(typeof target === 'string') {
      target = document.querySelectorAll(target);
    }

    if(target.length === undefined) {
      target = [target];
    }

    [].forEach.call(target, function(el) {
      var n = value === undefined ? !el.getAttribute('readonly') : value;
      readonly[n ? 'activate' : 'deactivate'](el);
    });
  }

  readonly.activate = function(el) {
    el.setAttribute('readonly', true);
    el.setAttribute('disabled', true);

    el.classList.add('readonly');

    var checkable = /checkbox|radio/i.test(el.type);

    console.log(el.nodeName, checkable);

    if(!checkable || (checkable && el.checked)) {
      var sham = document.createElement('input');

      sham.name = el.name;
      sham.type = 'hidden';
      sham.value = el.value;
      sham.setAttribute('data-sham', el.name);

      el.parentNode.insertBefore(sham, el.nextSibling);
    }
  };

  readonly.deactivate = function(el) {
    el.setAttribute('readonly', false);
    el.setAttribute('disabled', false);

    el.classList.remove('readonly');

    var sham = el.parentNode.querySelector('[data-sham="' + el.name + '"]');
    if(sham) el.parentNode.removeChild(sham);
  };

  this.readonly = readonly;

  if(this.jQuery !== undefined) {
    this.jQuery.fn.readonly = function(value) {
      return this.each(function() {
        readonly(this, value);
      });
    };
  }

})(this);
