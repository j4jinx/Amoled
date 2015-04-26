if (typeof (_AM) === 'undefined') {
	var _AM = {};
}
_AM.utils = {};

_AM.utils.extend = function(a, b) {
	for ( var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
};