/*  
    jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

    Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

    Original is (c) Dojo Foundation 2004-2009. Released under either AFL or new BSD, see:
    http://dojofoundation.org/license for more information.

    hacked into actual working order by JIM GREENLEAF THATS WHO
*/

(function($) {
    // the topic/subscription hash
    var cache = {};

    $.publish = function(/* String */topic, /* Array? */args){
        // Publish stuff on '/some/topic'. Anything subscribed will be called
        // with a function signature like: function(a,b,c) { ... }
        // $.publish('/some/topic', ['a','b','c']);

        if (!cache[topic]) { return; }
        $.each(cache[topic], function(i, callback) {
            callback.apply($, args || []);
        });
    };

    $.subscribe = function(/* String */topic, /* Function */callback){
        // $.subscribe('/some/topic', function(a, b, c) { /* handle data */ });

        if(!cache[topic]) { cache[topic] = []; }
        cache[topic].push(callback);
        return [topic, callback]; // Array
    };

    $.unsubscribe = function(/* Array */handle){
        // var handle = $.subscribe('/something', function() {});
        // $.unsubscribe(handle);

        var t = handle[0];
        cache[t] && $.each(cache[t], function(i, callback){
            if(callback == handle[1]){ cache[t].splice(i, 1); }
        });
    };

})(jQuery);
