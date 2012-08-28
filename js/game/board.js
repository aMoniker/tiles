(function($) {

var TheBoard = Base.extend({
     $: undefined
    ,rows: 7
    ,cols: 7
    ,tiles: [] // row, column: tiles[4][2]
    ,lines: {}
    ,constructor: function() {
        $.subscribe('Page.loaded', this.init.bindTo(this));
    }
    ,init: function() {
        this.$ = $('#content');
        $.subscribe('Game.new_game', this.new_game.bindTo(this));
    }
    ,new_game: function() {
        this.make_tiles();
    }
    ,make_tiles: function() {
        for (r = 0; r < this.rows; r++) {
            if (!this.tiles[r]) { this.tiles[r] = []; }
            for (c = 0; c < this.cols; c++) {
                var new_tile = new Game.Tile();
                this.tiles[r][c] = new_tile;
                this.$.find('#game_board').append(new_tile.canvas.$);
                new_tile.canvas.$.css({
                     'top': (new_tile.canvas.$.height() * (r + 1)) + 'px'
                    ,'left': (new_tile.canvas.$.width() * (c + 1)) + 'px'
                });
            }
        }
    }
});

new TheBoard();

})(jQuery);