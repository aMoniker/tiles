Game.Tile = Base.extend({
     canvas: undefined
    ,constructor: function() {
        var $tile_clone = $('#game_assets .blank_tile').clone();
        this.canvas = new Game.Canvas($tile_clone);
    }
});