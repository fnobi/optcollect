var _ = require('underscore');

var OptCollect = function (args) {
	this.options = [];
	this.values = {};
	this.command = null;

	this.parseArgs(args || process.argv);
};

OptCollect.prototype.parseArgs = function (args) {
	var self = this;

	args.forEach(function (arg) {
		if (arg.match(/^--/)) {
			self.options.push(arg.slice(2));
		} else if (arg.match(/^-/)) {
			arg.slice(1).split('').forEach(function (char) {
				self.options.push(char);
			});
		} else {
			if (!self.options.length) {
				self.command = arg;
				return;
			}
			self.values[_.last(self.options)] = arg;
		}
	});
};

OptCollect.prototype.isTrue = function (name) {
	return _.include(this.options, name);
};

OptCollect.prototype.isFalse = function (name) {
	return !this.isTrue(name);
};

// 指定されたoptionsの真偽・および値を同一化する
OptCollect.prototype.group = function (options) {
	var self = this;

	// optionosに、ひとつでもtrueが含まれているか
	// => this.optionsとoptionsの共通部分が存在する
	var intersection = _.intersection(this.options, options);

	// 成立したなら、options全てをtrueにする
	// => this.optionsにoptionsをunionしてしまう
	if (intersection.length) {
		this.options = _.union(this.options, options);
	}

	var value = null;
	_.each(options, function (key) {
		value = self.values[key] || value;
	});

	if (value) {
		_.each(options, function (key) {
			self.values[key] = value;
		});
	}
};

OptCollect.prototype.value = function (key) {
	return this.values[key] || null;
};


module.exports = OptCollect;