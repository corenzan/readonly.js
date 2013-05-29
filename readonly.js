/**
 * Readonly v1.0.0
 * by Arthur Corenzan <arthur@corenzan.com>
 * more on //github.com/haggen/readonly
 */
;(function($, undefined) {

  function readonly(element) {
    if(element.is('select')) {
      element.addClass('readonly').data('readonly', true).prop('disabled', true);
      element.after('<input type="hidden" name="' + element[0].name + '" value="' + element[0].value + '" data-select-sham>');
    } else {
      element.prop('readonly', true);
    }
  }

  function editable(element) {
    if(element.is('select')) {
      element.removeClass('readonly').removeData('readonly');
      element.prop('disabled', false).next('[data-select-sham]').remove();
    } else {
      element.prop('readonly', false);
    }
  }

  $.fn.readonly = function(state) {
    return this.each(function(index, element) {
      element = $(element);

      if(state === undefined) {
        if(element.is('select')) {
          state = !element.data('readonly');
        } else {
          state = !element.prop('readonly');
        }
      }

      if(state) {
        readonly(element);
      } else {
        editable(element);
      }
    });
  };
})(window.jQuery);
