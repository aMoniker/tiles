(function($) {

var TheBoard = Base.extend({
     $: undefined
    ,rows: 7
    ,cols: 7
    ,tiles: [] // row, column: tiles[4][2]
    ,constructor: function() {
        $.subscribe('Page.loaded', this.init.bindTo(this));
    }
    ,init: function() {
        this.$ = $('#content');
        $.subscribe('Game.new_board', this.new_board.bindTo(this));
    }
    ,new_board: function() {
        // generate all the tiles
        for (var r = 1; r < this.rows + 1; r++) {
            this.tiles[r] = [];
            for (var c = 1; c < this.cols + 1; c++) {
                // for now just dom elements, but Tile should be an object

                var $new_tile = this.$.find('#game_assets .blank_tile').clone();
                this.tiles[r][c] = $new_tile;
                this.$.find('#game_board').append($new_tile);

                $new_tile.css({
                     'top': ($new_tile.height() * r * -1) + 'px'
                    ,'left': ($new_tile.width() * c * -1) + 'px'
                });
            }
        }
    }
});

new TheBoard();

})(jQuery);