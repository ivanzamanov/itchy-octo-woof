var http = require('http'),
    fs = require('fs'),
    os = require('os');

var args = process.argv;

if(args.length < 3) {
  console.log('Usage: <cmd> <FILE> [<port>]');
  process.exit(1);
}

var FILE = args[2],
    PORT = args[3] || 7000;

var server = http.createServer(function(req, resp) {
  if(req.url.substring(1) !== FILE) {
    resp.setHeader('Location', FILE);
    resp.statusCode = 303;
    resp.end();
  } else {
    resp.setHeader('Content-Type', 'application/octet-stream');
    var str = fs.createReadStream(FILE);
    str.pipe(resp);
  }
}).listen(PORT);
console.log('Serving file: ' + FILE);

process.on('exit', function() {
  console.log('exiting');
  server.close();
});

console.log('Available interfaces: ');
var faces = os.networkInterfaces();
for(var face in faces) {
  faces[face].forEach(function(addr) {
    console.log(face + ": " + addr.address + ":" + PORT);
  });
}
