/* HTTP(S) REST Client Implementation */
var $request = (function() {
	"use strict";
	var $request = {};

	// FIXME: Export this lib as a different component

	/** Execute REST GET query */
	$request.get = function(url, fn) {
		return $.getJSON(url, fn);
	};

	/** Execute REST POST query */
	$request.post = function(url, data, fn) {
		return $.post(url, data, fn);
	};

	return $request;
}());
/* EOF */
