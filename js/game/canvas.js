Game.Canvas = Base.extend({
     $: undefined
    ,context: undefined
    ,color: '#556270'
    ,thickness: 10
    ,constructor: function($) {
        this.$ = $;
        this.context = $[0].getContext('2d');
        this.context.lineWidth = this.thickness;
        this.context.lineCap = 'round';
        this.set_color.bindTo(this)();
    }
    ,set_color: function(hex) {
        this.color = hex || this.color;
        this.context.fillStyle   = this.color;
        this.context.strokeStyle = this.color;
    }
    ,draw_dot: function(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, (this.thickness / 2), 0, (Math.PI * 2), true);
        this.context.closePath();
        this.context.fill();
    }
    ,draw_line: function(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }
});