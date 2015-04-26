(function() {
	"use strict";
	var Domya;

	Domya = (function() {
		function Domya() {
		}

		Domya.prototype.$id = function(selector) {
			return document.getElementById(selector);
		};

		Domya.prototype.$ = function(selector, context) {
			return (context || document).querySelector(selector);
		};

		Domya.prototype.$$ = function(selector, context) {
			return (context || document).querySelectorAll(selector);
		};

		Domya.prototype.show = function(ele) {
			if (ele != null) {
				ele.style.display = 'block';
			}
			return this;
		};

		Domya.prototype.hide = function(ele) {
			if (ele != null) {
				ele.style.display = 'none';
			}
			return this;
		};

		Domya.prototype.addClass = function(ele, cls) {
			if (ele != null) {
				ele.classList.add(cls);
			}
			return this;
		};

		Domya.prototype.removeClass = function(ele, cls) {
			if (ele != null) {
				ele.classList.remove(cls);
			}
			return this;
		};

		Domya.prototype.toggleClass = function(ele, cls) {
			if (ele != null) {
				ele.classList.toggle(cls);
			}
			return this;
		};

		Domya.prototype.on = function(ele, type, hanlder) {
			if (ele != null) {
				ele.addEventListener(type, hanlder, false);
			}
			return this;
		};

		Domya.prototype.off = function(ele, type, hanlder) {
			if (ele != null) {
				ele.removeEventListener(type, hanlder, false);
			}
			return this;
		};

		Domya.prototype.remove = function(ele) {
			var _ref;
			if (ele != null) {
				if ((_ref = ele.parentNode) != null) {
					_ref.removeChild(ele);
				}
			}
			return this;
		};

		Domya.prototype.ready = function(hanlder) {
			return this.on(window, 'DOMContentLoaded', hanlder);
		};

		Domya.prototype.ajax = function(type, url, data, success) {
			var key, text, xhr;
			if (typeof data === 'function') {
				success = data;
				data = {};
			}
			xhr = new XMLHttpRequest;
			xhr.open(type, url, false);
			xhr.onreadystatechange = function() {
				if (xhr.status === 200) {
					if (data.type === 'json') {
						return success(JSON.parse(xhr.responseText));
					} else if (data.type === 'xml') {
						return success(xhr.responseXML);
					} else {
						return success(xhr.responseText);
					}
				} else {
					return success(null);
				}
			};
			if (type === 'POST') {
				text = '';
				for (key in data) {
					text += key + '=' + encodeURIComponent(data[key]);
				}
				xhr.setRequestHeader("Content-type",
						"application/x-www-form-urlencoded");
				return xhr.send(text);
			} else {
				return xhr.send(data);
			}
		};

		Domya.prototype.load = function(url, data, success) {
			return this.ajax('GET', url, data, success);
		};

		Domya.prototype.post = function(url, data, success) {
			return this.ajax('POST', url, data, success);
		};

		Domya.prototype.whichDevice = function() {
			var ua = navigator.userAgent.toLowerCase();
			if (/iphone|ipad|ipod/.test(ua)) {
				return 'iOS';
			} else if (/android/.test(ua)) {
				return 'Android';
			} else if (/IEMobile/.test(ua)) {
				return 'wp';
			} else {
				return 'Desktop';
			}
		};

		return Domya;

	})();

	window.Domya = Domya;

}).call(this);
