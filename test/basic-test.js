var buster     = require('buster'),
    OptCollect = require(__dirname + '/..');

buster.testCase('optcollect', {
	'get true option list': function () {
		var opts = new OptCollect(['-svx']);
		assert(opts.options == ['s', 'v', 'x']);
	},
	'check true': function () {
		var opts = new OptCollect(['-svx']);
		assert(opts.isTrue('s'));
	},
	'check false': function () {
		var opts = new OptCollect(['-svx']);
		refuse(opts.isTrue('a'));
	},
	'get value': function () {
		var opts = new OptCollect(['-s', 'hogehoge']);
		assert(opts.value('s') == 'hogehoge');
	},
	'group options': function () {
		var opts = new OptCollect(['--safari']);
		opts.group(['s', 'safari']);

		assert(opts.isTrue('s'));
	}
});