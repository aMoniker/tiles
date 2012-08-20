(function($) {

var TheControls = Base.extend({
     $: undefined
    ,zoom: 1
    ,constructor: function() {
        $.subscribe('Page.loaded', this.init.bindTo(this));
    }
    ,init: function() {
        var thisref = this;
        this.$ = $('#content');

        $(window).on('mousewheel', function(e, delta, delta_x, delta_y) {
            e.preventDefault();
            e.stopPropagation();

            var zoom = parseFloat(thisref.$.css('zoom'), 10);
            if (delta < 0 && zoom > 0.2) { // zoom out
                thisref.$.css('zoom', zoom - 0.1);
            } else if (delta > 0 && zoom < 2) { // zoom in
                thisref.$.css('zoom', zoom + 0.1);
            }
        });
    }
});

new TheControls();

})(jQuery);