var accounting = require('accounting');

module.exports = {

	split2: function(str, delim=' ') {
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
	}

}