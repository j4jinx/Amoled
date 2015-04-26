if (typeof (_AM) === 'undefined') {
	var _AM = {};
}
_AM.pages = {};

_AM.pages.getPageItem = function(item, data) {
	var _this = this;

	var defaults = _this.getPageItemDefaults(item);
	data = _AM.extend(defaults, data || {});

	var tmpl = _this.getPageItemHtml(item);
	return Hogan.compile(tmpl).render(data);
};

_AM.pages.getPageItemHtml = function(item) {
	var raw = "";
	switch (item) {

	case "ptPage":
		raw = '<div id="ptPage{{id}}" class="pt-page {{theme}}">'
				+ '<div id="ptPageContainer{{id}}" class="pt-page-container"></div>'
				+ '</div>';
		break;

	case "header":
		raw = '<div id="{{pageId}}" class="pt-page {{theme}}">'
				+ '<div id="ptPageContainer" class="pt-page-container"></div>'
				+ '</div>';
		break;

	default:
		break;
	}

	return raw;
};

_AM.pages.getPageItemDefaults = function(item) {
	var defaults = {};
	switch (item) {

	case "ptPage":
		defaults = {
			id : "1",
			theme : "pt-page-1"
		};
		break;

	case "header":
		defaults = {
			id : "ptPage",
			theme : "pt-page-1"
		};
		break;

	default:
		break;
	}

	return defaults;
};

_AM.pages.getPage = function(page) {
	var _this = this;

	switch (page) {
	case "home":
		_this.getPageHome();
		break;

	case "about":
		_this.getPageAbout();
		break;

	default:
		break;
	}
};

_AM.pages.getPageHome = function() {

};

_AM.pages.getPageAbout = function() {

};