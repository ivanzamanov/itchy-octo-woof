var http = require('http'),
    fs = require('fs');

var args = process.argv;

if(args.length < 3) {
  console.log('Usage: <cmd> <FILE> [<port>]');
  process.exit(1);
}

var FILE = args[2],
    PORT = args[3] || 7000;

console.log('Serving ' + FILE + ' on port ' + PORT);

var server = http.createServer(function(req, resp) {
  var str = fs.createReadStream(FILE);
  str.pipe(resp);
}).listen(PORT);

process.on('exit', function() {
  console.log('exiting');
  server.close();
});
