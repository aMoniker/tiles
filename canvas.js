(function($) {

var TheCanvas = Base.extend({
     $canvas: undefined
    ,context: undefined
    ,color: '#000000'
    ,thickness: 10
    ,subscribers: {
         set_canvas: function($canvas) {
            this.$canvas = $canvas;
            this.context = $canvas[0].getContext('2d');
            this.context.lineWidth = this.thickness;
            this.context.lineCap = 'round';
        }
        ,set_color: function(hex) { 
            this.color = hex;
            this.context.fillStyle   = hex;
            this.context.strokeStyle = hex;
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
    }
    ,constructor: function() {
        $.subscribe('Canvas.set_canvas', this.subscribers.set_canvas.bindTo(this) );
        $.subscribe('Canvas.set_color' , this.subscribers.set_color .bindTo(this)  );
        $.subscribe('Canvas.draw_dot'  , this.subscribers.draw_dot  .bindTo(this)   );
        $.subscribe('Canvas.draw_line' , this.subscribers.draw_line .bindTo(this)    );
    }

});

new TheCanvas();

})(jQuery);