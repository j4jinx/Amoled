// DOM ko pakadna mushkil hi nahin namumkin hai...

if (typeof (_AM) === 'undefined') {
	var _AM = {};
}

_AM.options = {
	routes : [],
	config : {}
};

_AM.init = function(options) {
	var d = new promise.Promise();
	var _this = this;

	_this.options = _this.utils.extend({}, _this.options);
	_this.utils.extend(_this.options, options);

	_this.routeTo({
		route : 'home'
	});

	_this.HandleDelegates();

	setTimeout(function() {
		d.done(null, "!niti@ted");
	});

	return d;
};

_AM.routeTo = function(options) {
	var _this = this;

	var defaults = {
		animate : true,
		loader : false,
		scroll : false,
		route : 'error'
	};

	options = _this.utils.extend(defaults, options || {});

	_this.pager.animPage(options).then(function(err1, ptPage) {

		_this.router.execRoute(options)

		.then(function(err2, ctx) {
			_this.onRoute(ptPage, ctx);
		});
	});
};

_AM.HandleDelegates = function() {
	FastClick.attach(document.body);

	var _this = this;

	try {
		if (_this.delegate) {
			_this.delegate.destroy();
		}
	} catch (e) {
		console.log(e);
	}

	_this.delegate = new Delegate(document.body);

	_this.delegate.on('click', '.am-ui', function(ev, target) {
		var kind = target.getAttribute("data-am-ui");

		if (kind === "route") {
			var vRoute = target.getAttribute("data-am-ui-value");
			var animation = target.getAttribute("data-am-ui-animation");
			var theme = target.getAttribute("data-am-ui-theme");

			if (_this.router.current.route === vRoute) {
				return false;
			}

			theme = "pt-page-" + Math.floor((Math.random() * 6) + 1);
			animation = Math.floor((Math.random() * 67) + 1);

			_this.routeTo({
				route : vRoute,
				theme : theme,
				animation : animation
			});
		}
		return false;
	});
};

_AM.getRouteData = function(route) {
	console.log("@Override");
};

_AM.onRoute = function(pager) {
	console.log("@Override");
};