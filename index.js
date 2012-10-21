var _ = require('underscore');

var OptCollect = function (options) {
	var self = this;

	this.options = [];
	options.forEach(function (option) {
		if (option.match(/^--/)) {
			self.options.push(option.slice(2));
		} else if (option.match(/^-/)) {
			option.slice(1).split('').forEach(function (char) {
				self.options.push(char);
			});
		}
	});
};

OptCollect.prototype.isTrue = function (name) {
	return _.include(this.options, name);
};


module.exports = OptCollect;