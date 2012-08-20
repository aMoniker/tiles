var paperboy = require('paperboy');
var http     = require('http');
var path     = require('path');
var io       = require('socket.io').listen(1337);

global.jQuery = require('jquery');
var pubsub = require('../js/lib/jq.pubsub.js');

var webroot = path.join(__dirname, '..');
var port = 8080;

http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(webroot, req, res)
    .addHeader('X-Powered-By', 'Weasels')
    .before(function() {
      //console.log('Request received for ' + req.url);
    })
    .after(function(statusCode) {
      console.log(statusCode + ' - ' + req.url + ' ' + ip);
    })
    .error(function(statusCode, msg) {
      console.log([statusCode, msg, req.url, ip].join(' '));
      res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
      res.end('Error [' + statusCode + ']');
    })
    .otherwise(function(err) {
      console.log([404, err, req.url, ip].join(' '));
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Error 404: File not found');
    });
}).listen(port);
console.log('paperboy on his round at http://localhost:' + port);

io.set('log level', 1); // 0, 1, 2, 3 (error, warn, info, debug)
io.sockets.on('connection', function(socket) {
  /*
  socket.on('msg', function () {
    socket.get('nickname', function(err, name) {
      console.log('Chat message by ', name);
    });
  });
  */

  socket.emit('ready', 'lets eat pie');
});