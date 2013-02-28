/**
 * ReadOnlySelect v1.0
 * by Arthur Corenzan <arthur@corenzan.com>
 * license http://creativecommons.org/licenses/by-sa/3.0
 * more on https://github.com/haggen/readonlyselect
 */
(function($) {
  $.fn.readonly = function(state) {

    this.filter('select').each(function(i, select) {
      $select = $(select);

      if(state === undefined) {
        state = !$select.data('readonly');
      }

      if(state) {
        $select
          .addClass('readonly')
          .data('readonly', true)
          .attr('disabled', true)
          .after('<input type="hidden" name="' + select.name + '" value="' + select.value + '" class="readonlyreplacer">');
      } else {
        $select
          .removeClass('readonly')
          .removeData('readonly')
          .attr('disabled', false)
          .next('.readonlyreplacer').remove();
      }
    });

    return this;
  };
})(window.jQuery);
