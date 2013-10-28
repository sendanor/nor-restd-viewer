/** API viewer for Sendanor REST Daemon */
module.exports = function(opts) {
	opts = opts || {};

	if(opts.url) {
		opts.url = require('url').parse(opts.url);
	}

	var util = require('util');
	var express = require('express');
	var path = require('path');
	var app = module.exports = express();
	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hjs');

	Object.keys(opts).forEach(function(key) {
		app.set('plugin ' + key, opts[key]);
	});
	
	app.locals({'plugin': opts});

	app.use(express.favicon());
	//app.use(express.logger('dev'));
	//app.use(express.bodyParser());
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	
	app.use(app.router);

	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' === app.get('env')) {
		app.use(express.errorHandler());
	}
	
	app.use(function(req, res, next) {
		res.render('index', { title: req.url });
	});
	
	return app;
};
/* EOF */
