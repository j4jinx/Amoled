if (typeof (_AM) === 'undefined') {
	var _AM = {};
}
/*
 * DOM Ka Intezar to 11 Mulkon ke Browsers ko karna hi padta hain...
 */

(function() {
	'use strict';

	var protocol = location.protocol;
	if (protocol.indexOf("http:") === 0) {
		document.addEventListener("DOMContentLoaded", onDeviceReady, false);
	} else {
		document.addEventListener('deviceready', onDeviceReady, false);
	}

	function onDeviceReady() {

		var ViewPath = "Amoled/views/";

		var routes = [ {
			route : "home",
			hash : "#home",
			tmpl : ViewPath + "home.html"
		}, {
			route : "portfolio",
			hash : "#portfolio",
			tmpl : ViewPath + "portfolio.html"
		}, {
			route : "about",
			hash : "#about",
			tmpl : ViewPath + "about.html"
		}, {
			route : "error",
			hash : "#error",
			tmpl : ViewPath + "error.html"
		} ];

		var options = {
			routes : routes
		};

		_AM.init(options).then(function(err, done) {
			console.log(done);

			_AM.onRoute = function(ptPage, ctx) {
				console.log("onRoute");
				console.log(ptPage, ctx);
			};

			_AM.getRouteData = function(route) {
				var d = new promise.Promise();
				setTimeout(function() {
					d.done(null, {});
				});
				return d;
			};
		});

	}

})();