var express = require('express');
var bodyparser = require('body-parser');
var https  = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};


var app = express();
app.use(express.static('client'));
app.use(bodyparser.json());

process.on('SIGINT', function(){
	console.log("Closing HTTP server");
	process.exit(0);
});

app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
});

// Body of application and calls
https.createServer(options, app).listen(5000);
console.log("Now listening on port 5000");
