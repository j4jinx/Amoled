if (typeof (_AM) === 'undefined') {
	var _AM = {};
}

(function(window) {

	'use strict';

	function Router() {
		this.caches = {};
	}

	Router.prototype.options = {
		ViewPath : "Amoled/views/"
	};

	Router.prototype.setRoutes = function(options, routes) {
		this.options = _AM.extend({}, this.options);
		_AM.extend(this.options, options);

		page('*', _AM.RouterInit);
		for ( var key in routes) {
			if (routes.hasOwnProperty(key)) {
				page('/' + key, routes[key]);
			}
		}
		page('*', _AM.RouterRender);
		page();
	};

	Router.prototype.getTemplate = function(url) {
		url = this.getViewPath() + url + ".html";
		var d = new promise.Promise();
		promise.get(url).then(function(error, text, xhr) {
			if (error) {
				return d.done(true, xhr.status);
			} else {
				return d.done(null, text);
			}
		});
		return d;
	};

	Router.prototype.getViewPath = function() {
		return this.options.ViewPath;
	};

	window.Router = Router;

})(window);