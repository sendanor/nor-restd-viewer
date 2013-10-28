/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(function(req, res) {
	res.render('index', { title: 'Express' });
});

//app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/* EOF */
