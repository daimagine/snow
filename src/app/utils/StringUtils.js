var accounting = require('accounting');
var iteratee = require('amp-iteratee');
var pluck = require('amp-pluck');
var map = require('amp-map');


module.exports = {

	split2: function(str, delim=' ') {
		if (str == null || str.length < 1)
			return [str,''];
	    var parts=str.split(delim);
	    return [parts[0], parts.splice(1,parts.length).join(delim)];
	},

	numberFormatter: function() {
		// Settings object that controls default parameters for library methods:
		accounting.settings = {
			currency: {
				symbol : "Rp",   // default currency symbol is '$'
				format: "%s %v", // controls output: %s = symbol, %v = value/number (can be object: see below)
				decimal : ",",  // decimal point separator
				thousand: ".",  // thousands separator
				precision : 2   // decimal places
			},
			number: {
				precision : 0,  // default precision on numbers is 0
				thousand: ".",
				decimal : ","
			}
		}
		return accounting;
	},

	sortBy: function(array, comparator, context) {
	    comparator = iteratee(comparator, context);
	    return pluck(map(array, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: comparator(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (typeof a == "string") {
	      	a = a.toLowerCase();
	      }
	      if (typeof b == "string") {
	      	b = b.toLowerCase();
	      }
	      console.log('ProductStore: sortBy a b', a, b);
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	},

}