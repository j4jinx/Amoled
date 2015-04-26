if (typeof (_AM) === 'undefined') {
	var _AM = {};
}

_AM.pager = {};

_AM.pager.current;
_AM.pager.currentCtr;
_AM.pager.isAnimating = false;
_AM.pager.endCurrPage = false;
_AM.pager.endNextPage = false;

_AM.pager.animPage = function(options) {
	var _this = this;
	var d = new promise.Promise();

	if (_this.isAnimating) {
		setTimeout(function() {
			d.done(true, 'loading');
		});
		return d;
	}

	_this.isAnimating = true;

	var defaults = {
		theme : 'pt-page-1',
		animation : 3
	};
	options = _AM.utils.extend(defaults, options || {});

	// var ctx = _AM.router.getRouteCtx(vRoute);

	if (!_this.current) {
		if (!_this.currentCtr) {
			_this.currentCtr = 1;
		}

		_this.current = options;

		var pageOpts = {
			id : _this.currentCtr,
			theme : options.theme
		};

		var currPage = _AM.pager.getPtPage(pageOpts);
		var pElm = document.getElementById('ptPerspective');

		pElm.innerHTML = "";
		pElm.appendChild(currPage);

		var pgElm = document.getElementById('ptPage' + _this.currentCtr);
		var animCls = _this.getAnimCls(options.animation);

		pgElm.classList.add('pt-page-current');
		pgElm.classList.addMany(animCls.inClass);

		_this.addPrefixedEvent(pgElm, 'AnimationEnd', function() {
			_this.removePrefixedEvent(pgElm, 'AnimationEnd');
			_this.isAnimating = false;
			d.done(null, pgElm);
		});

		return d;
	}

	var cpage = _this.currentCtr;
	var npage = (_this.currentCtr === 2) ? 1 : 2;

	var pageOpts = {
		id : npage,
		theme : options.theme
	};

	var nextPage = _AM.pager.getPtPage(pageOpts);

	var pElm = document.getElementById('ptPerspective');
	pElm.appendChild(nextPage);

	pElm.offsetWidth;

	var $currPageElm = document.getElementById('ptPage' + cpage);
	var $nextPageElm = document.getElementById('ptPage' + npage);

	$nextPageElm.classList.add('pt-page-current');

	var animCls = _this.getAnimCls(options.animation);
	var outClass = animCls.outClass;
	var inClass = animCls.inClass;

	var oldAnimCls = _this.getAnimCls(_this.current.animation);

	$currPageElm.classList.removeMany(oldAnimCls.outClass);
	$currPageElm.classList.removeMany(oldAnimCls.inClass);

	$currPageElm.classList.addMany(outClass);

	_this.addPrefixedEvent($currPageElm, 'AnimationEnd', function() {
		_this.removePrefixedEvent($currPageElm, 'AnimationEnd');
		_this.endCurrPage = true;
		if (_this.endNextPage) {
			_this.onEndAnimation($currPageElm, $nextPageElm)

			.then(function(err) {
				$currPageElm.remove();
				d.done(err, $nextPageElm);
			});
		}
	});

	$nextPageElm.classList.addMany(inClass);

	_this.addPrefixedEvent($nextPageElm, 'AnimationEnd', function() {
		_this.removePrefixedEvent($nextPageElm, 'AnimationEnd');
		_this.endNextPage = true;
		if (_this.endCurrPage) {
			_this.onEndAnimation($currPageElm, $nextPageElm)

			.then(function(err) {
				$currPageElm.remove();
				d.done(err, $nextPageElm);
			});
		}
	});

	_this.current = options;
	_this.currentCtr = npage;
	return d;

};

_AM.pager.getPtPage = function(options) {
	var ptPage = document.createElement("div");
	ptPage.id = "ptPage" + options.id;
	ptPage.className = "pt-page " + options.theme;

	var ptPageContainer = document.createElement("div");
	ptPageContainer.id = "ptPageContainer" + options.id;
	ptPageContainer.className = "pt-page-container";

	ptPage.appendChild(ptPageContainer);
	return ptPage;
};

_AM.pager.onEndAnimation = function($currPageElm, $nextPageElm) {
	var d = new promise.Promise();
	this.endCurrPage = false;
	this.endNextPage = false;
	$currPageElm.classList.remove('pt-page-current');
	$nextPageElm.classList.add('pt-page-current');
	this.isAnimating = false;
	setTimeout(function() {
		d.done(null);
	});
	return d;
};

_AM.pager.addPrefixedEvent = function(element, type, callback) {
	var pfx = [ "webkit", "moz", "MS", "o", "" ];
	for ( var p = 0; p < pfx.length; p++) {
		if (!pfx[p])
			type = type.toLowerCase();
		element.addEventListener(pfx[p] + type, callback, false);
	}
};

_AM.pager.removePrefixedEvent = function(element, type, callback) {
	var pfx = [ "webkit", "moz", "MS", "o", "" ];
	for ( var p = 0; p < pfx.length; p++) {
		if (!pfx[p])
			type = type.toLowerCase();
		element.removeEventListener(pfx[p] + type, callback, false);
	}
};

_AM.pager.getAnimCls = function(animation) {
	var outClass = "pt-page-moveToLeft";
	var inClass = "pt-page-moveFromRight";

	animation = Number(animation);

	switch (animation) {

	case 1:
		outClass = 'pt-page-moveToLeft';
		inClass = 'pt-page-moveFromRight';
		break;
	case 2:
		outClass = 'pt-page-moveToRight';
		inClass = 'pt-page-moveFromLeft';
		break;
	case 3:
		outClass = 'pt-page-moveToTop';
		inClass = 'pt-page-moveFromBottom';
		break;
	case 4:
		outClass = 'pt-page-moveToBottom';
		inClass = 'pt-page-moveFromTop';
		break;
	case 5:
		outClass = 'pt-page-fade';
		inClass = 'pt-page-moveFromRight pt-page-ontop';
		break;
	case 6:
		outClass = 'pt-page-fade';
		inClass = 'pt-page-moveFromLeft pt-page-ontop';
		break;
	case 7:
		outClass = 'pt-page-fade';
		inClass = 'pt-page-moveFromBottom pt-page-ontop';
		break;
	case 8:
		outClass = 'pt-page-fade';
		inClass = 'pt-page-moveFromTop pt-page-ontop';
		break;
	case 9:
		outClass = 'pt-page-moveToLeftFade';
		inClass = 'pt-page-moveFromRightFade';
		break;
	case 10:
		outClass = 'pt-page-moveToRightFade';
		inClass = 'pt-page-moveFromLeftFade';
		break;
	case 11:
		outClass = 'pt-page-moveToTopFade';
		inClass = 'pt-page-moveFromBottomFade';
		break;
	case 12:
		outClass = 'pt-page-moveToBottomFade';
		inClass = 'pt-page-moveFromTopFade';
		break;
	case 13:
		outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
		inClass = 'pt-page-moveFromRight';
		break;
	case 14:
		outClass = 'pt-page-moveToRightEasing pt-page-ontop';
		inClass = 'pt-page-moveFromLeft';
		break;
	case 15:
		outClass = 'pt-page-moveToTopEasing pt-page-ontop';
		inClass = 'pt-page-moveFromBottom';
		break;
	case 16:
		outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
		inClass = 'pt-page-moveFromTop';
		break;
	case 17:
		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-moveFromRight pt-page-ontop';
		break;
	case 18:
		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-moveFromLeft pt-page-ontop';
		break;
	case 19:
		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-moveFromBottom pt-page-ontop';
		break;
	case 20:
		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-moveFromTop pt-page-ontop';
		break;
	case 21:
		outClass = 'pt-page-scaleDown';
		inClass = 'pt-page-scaleUpDown pt-page-delay300';
		break;
	case 22:
		outClass = 'pt-page-scaleDownUp';
		inClass = 'pt-page-scaleUp pt-page-delay300';
		break;
	case 23:
		outClass = 'pt-page-moveToLeft pt-page-ontop';
		inClass = 'pt-page-scaleUp';
		break;
	case 24:
		outClass = 'pt-page-moveToRight pt-page-ontop';
		inClass = 'pt-page-scaleUp';
		break;
	case 25:
		outClass = 'pt-page-moveToTop pt-page-ontop';
		inClass = 'pt-page-scaleUp';
		break;
	case 26:
		outClass = 'pt-page-moveToBottom pt-page-ontop';
		inClass = 'pt-page-scaleUp';
		break;
	case 27:
		outClass = 'pt-page-scaleDownCenter';
		inClass = 'pt-page-scaleUpCenter pt-page-delay400';
		break;
	case 28:
		outClass = 'pt-page-rotateRightSideFirst';
		inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
		break;
	case 29:
		outClass = 'pt-page-rotateLeftSideFirst';
		inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
		break;
	case 30:
		outClass = 'pt-page-rotateTopSideFirst';
		inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
		break;
	case 31:
		outClass = 'pt-page-rotateBottomSideFirst';
		inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
		break;
	case 32:
		outClass = 'pt-page-flipOutRight';
		inClass = 'pt-page-flipInLeft pt-page-delay500';
		break;
	case 33:
		outClass = 'pt-page-flipOutLeft';
		inClass = 'pt-page-flipInRight pt-page-delay500';
		break;
	case 34:
		outClass = 'pt-page-flipOutTop';
		inClass = 'pt-page-flipInBottom pt-page-delay500';
		break;
	case 35:
		outClass = 'pt-page-flipOutBottom';
		inClass = 'pt-page-flipInTop pt-page-delay500';
		break;
	case 36:
		outClass = 'pt-page-rotateFall pt-page-ontop';
		inClass = 'pt-page-scaleUp';
		break;
	case 37:
		outClass = 'pt-page-rotateOutNewspaper';
		inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
		break;
	case 38:
		outClass = 'pt-page-rotatePushLeft';
		inClass = 'pt-page-moveFromRight';
		break;
	case 39:
		outClass = 'pt-page-rotatePushRight';
		inClass = 'pt-page-moveFromLeft';
		break;
	case 40:
		outClass = 'pt-page-rotatePushTop';
		inClass = 'pt-page-moveFromBottom';
		break;
	case 41:
		outClass = 'pt-page-rotatePushBottom';
		inClass = 'pt-page-moveFromTop';
		break;
	case 42:
		outClass = 'pt-page-rotatePushLeft';
		inClass = 'pt-page-rotatePullRight pt-page-delay180';
		break;
	case 43:
		outClass = 'pt-page-rotatePushRight';
		inClass = 'pt-page-rotatePullLeft pt-page-delay180';
		break;
	case 44:
		outClass = 'pt-page-rotatePushTop';
		inClass = 'pt-page-rotatePullBottom pt-page-delay180';
		break;
	case 45:
		outClass = 'pt-page-rotatePushBottom';
		inClass = 'pt-page-rotatePullTop pt-page-delay180';
		break;
	case 46:
		outClass = 'pt-page-rotateFoldLeft';
		inClass = 'pt-page-moveFromRightFade';
		break;
	case 47:
		outClass = 'pt-page-rotateFoldRight';
		inClass = 'pt-page-moveFromLeftFade';
		break;
	case 48:
		outClass = 'pt-page-rotateFoldTop';
		inClass = 'pt-page-moveFromBottomFade';
		break;
	case 49:
		outClass = 'pt-page-rotateFoldBottom';
		inClass = 'pt-page-moveFromTopFade';
		break;
	case 50:
		outClass = 'pt-page-moveToRightFade';
		inClass = 'pt-page-rotateUnfoldLeft';
		break;
	case 51:
		outClass = 'pt-page-moveToLeftFade';
		inClass = 'pt-page-rotateUnfoldRight';
		break;
	case 52:
		outClass = 'pt-page-moveToBottomFade';
		inClass = 'pt-page-rotateUnfoldTop';
		break;
	case 53:
		outClass = 'pt-page-moveToTopFade';
		inClass = 'pt-page-rotateUnfoldBottom';
		break;
	case 54:
		outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
		inClass = 'pt-page-rotateRoomLeftIn';
		break;
	case 55:
		outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
		inClass = 'pt-page-rotateRoomRightIn';
		break;
	case 56:
		outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
		inClass = 'pt-page-rotateRoomTopIn';
		break;
	case 57:
		outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
		inClass = 'pt-page-rotateRoomBottomIn';
		break;
	case 58:
		outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
		inClass = 'pt-page-rotateCubeLeftIn';
		break;
	case 59:
		outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
		inClass = 'pt-page-rotateCubeRightIn';
		break;
	case 60:
		outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
		inClass = 'pt-page-rotateCubeTopIn';
		break;
	case 61:
		outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
		inClass = 'pt-page-rotateCubeBottomIn';
		break;
	case 62:
		outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
		inClass = 'pt-page-rotateCarouselLeftIn';
		break;
	case 63:
		outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
		inClass = 'pt-page-rotateCarouselRightIn';
		break;
	case 64:
		outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
		inClass = 'pt-page-rotateCarouselTopIn';
		break;
	case 65:
		outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
		inClass = 'pt-page-rotateCarouselBottomIn';
		break;
	case 66:
		outClass = 'pt-page-rotateSidesOut';
		inClass = 'pt-page-rotateSidesIn pt-page-delay200';
		break;
	case 67:
		outClass = 'pt-page-rotateSlideOut';
		inClass = 'pt-page-rotateSlideIn';
		break;

	}

	return {
		outClass : outClass,
		inClass : inClass
	};
};

DOMTokenList.prototype.addMany = function(classes) {
	var array = classes.split(' ');
	for ( var i = 0, length = array.length; i < length; i++) {
		this.add(array[i]);
	}
};

DOMTokenList.prototype.removeMany = function(classes) {
	var array = classes.split(' ');
	for ( var i = 0, length = array.length; i < length; i++) {
		this.remove(array[i]);
	}
};
