var http = require('http');
var dt = require('./firstmodule');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("The date and time are currently: <br>" + dt.myDateTime());
    res.write('Hello World! <br>' + Date());
    res.end();
}).listen(8080);