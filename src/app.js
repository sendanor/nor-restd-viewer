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

	/** Removes temporarily `from_path` from `req.url` */
	/*
	function strip_url_path(from_path, mod) {
		function wrapper(req, res, next) {

			var orig_url = req.url;
			util.debug('req.url (before) = ' + util.inspect(req.url));
			function do_next() {
				req.url = orig_url;
				return next.apply(undefined, Array.prototype.slice.call(arguments) );
			}
			req.url = req.url.substr( from_path.length );
			util.debug('req.url (after) = ' + util.inspect(req.url));
			return mod(req, res, do_next);
		}
		return wrapper;
	}
	*/
	
	app.use('/public', express.static(path.join(__dirname, 'public')) );

	// development only
	if ('development' === app.get('env')) {
		app.use(express.errorHandler());
	}
	
	app.use(function(req, res) {
		res.render('index', { title: 'Express' });
	});
	
	return app;
};
/* EOF */
