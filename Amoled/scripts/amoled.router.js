if (typeof (_AM) === 'undefined') {
	var _AM = {};
}
// DOM zakhmi bhi ho jaye to DOM hi rahta hai...

_AM.router = {};

_AM.router.current;

_AM.router.execRoute = function(options) {
	var d = new promise.Promise();
	var _this = this;
	var ctx = _this.getRouteCtx(options.route);

	promise.get(ctx.tmpl).then(function(error, text, xhr) {
		if (error) {
			text = "<h3>Error</h3>" + xhr.status;
		} else {
			_this.current = options;
		}

		_AM.getRouteData(options)

		.then(function(err, data) {

			data = data || {};

			var tmpl = Hogan.compile("{{>content}}");
			var content = tmpl.render(data, {
				content : text
			});

			var cntnr = 'ptPageContainer' + _AM.pager.currentCtr;
			var elm = document.getElementById(cntnr);
			elm.innerHTML = content;
			d.done(null, ctx);
		});
	});

	return d;
};

_AM.router.getRouteCtx = function(vRoute) {
	var ctx = false;
	_AM.options.routes.forEach(function(route) {
		if (route.route === vRoute) {
			ctx = route;
		}
	});

	return ctx;
};

_AM.router.parseQS = function(qs) {
	var qrObj = {};
	if (qs && qs.length > 2) {
		var pairs = qs.split('&');
		var result = {};
		pairs.forEach(function(pair) {
			pair = pair.split('=');
			result[pair[0]] = decodeURIComponent(pair[1] || '');
		});
		qrObj = JSON.parse(JSON.stringify(result));
	}
	return qrObj;
};