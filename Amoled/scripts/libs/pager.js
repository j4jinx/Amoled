;
(function(window) {

	'use strict';

	var pfx = [ "webkit", "moz", "MS", "o", "" ];

	function AmoledPager() {
		this.current = 1;
		this.isAnimating = false;
		this.endCurrPage = false;
		this.endNextPage = false;

		document.getElementById('ptPage' + this.current).classList
				.add('pt-page-current');

	}

	AmoledPager.prototype.options = {
		animation : 1,
		theme : "pt-page-1"
	};

	AmoledPager.prototype.nextPage = function(options) {
		var d = new promise.Promise();
		var _this = this;
		this.options = extend({}, this.options);
		extend(this.options, options);

		if (_this.isAnimating) {
			return false;
		}

		_this.isAnimating = true;

		var cpage = _this.current;
		var npage = (_this.current === 2) ? 1 : 2;

		var $currPage = document.getElementById('ptPage' + cpage);
		var $nextPage = document.getElementById('ptPage' + npage);

		$nextPage.classList.add(_this.options.theme);
		$nextPage.classList.add('pt-page-current');

		var outClass = '', inClass = '';

		$currPage.classList.add(outClass);
		addPrefixedEvent($currPage, 'AnimationEnd', function() {
			removePrefixedEvent($currPage, 'AnimationEnd');
			_this.endCurrPage = true;
			if (_this.endNextPage) {
				_this.onEndAnimation($currPage, $nextPage);
			}
		});

		$nextPage.classList.add(inClass);
		addPrefixedEvent($nextPage, 'AnimationEnd', function() {
			removePrefixedEvent($nextPage, 'AnimationEnd');
			_this.endNextPage = true;
			if (_this.endCurrPage) {
				_this.onEndAnimation($currPage, $nextPage);
			}
			d.done(null, npage);
		});
		_this.current = npage;

		return d;
	};

	AmoledPager.prototype.onEndAnimation = function($outpage, $inpage) {
		this.endCurrPage = false;
		this.endNextPage = false;
		this.resetPage($outpage, $inpage);
		this.isAnimating = false;
	};

	AmoledPager.prototype.resetPage = function($outpage, $inpage) {
		$outpage.classList.add('pt-page');
		$outpage.classList.remove('pt-page-current');
		$inpage.classList.add('pt-page-current');
	};

	AmoledPager.prototype.getPage = function() {
		return this.current;
	};

	window.AmoledPager = AmoledPager;

	function extend(a, b) {
		for ( var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function addPrefixedEvent(element, type, callback) {
		for ( var p = 0; p < pfx.length; p++) {
			if (!pfx[p])
				type = type.toLowerCase();
			element.addEventListener(pfx[p] + type, callback, false);
		}
	}

	function removePrefixedEvent(element, type, callback) {
		for ( var p = 0; p < pfx.length; p++) {
			if (!pfx[p])
				type = type.toLowerCase();
			element.removeEventListener(pfx[p] + type, callback, false);
		}
	}

})(window);