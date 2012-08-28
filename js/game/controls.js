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
        this.bind_zoom();
        this.bind_buttons();
    }
    ,bind_zoom: function() {
        var thisref = this;

        $(window).on('mousewheel', function(e, delta, delta_x, delta_y) {
            e.preventDefault();
            e.stopPropagation();

            var zoom = parseFloat(thisref.$.css('zoom'), 10);
            var $board = thisref.$.find('#game_board');
            if (delta < 0 && zoom > 0.2) { // zoom out
                $board.css('zoom', zoom - 0.1);
            } else if (delta > 0 && zoom < 2) { // zoom in
                $board.css('zoom', zoom + 0.1);
            }
        });
    }
    ,bind_buttons: function() {
        this.$.find('#start_button').on('click', function() {
            $.publish('Game.new_game');
        });
    }
});

new TheControls();

})(jQuery);