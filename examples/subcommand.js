var format = require('util').format;
var inspect = require('util').inspect;
var command = require('../'); // 'commander-b'

var parent = command('parent <command>')
.action(function(command, options) {
  console.log(format('%s : %s, %s',
                     'parent action (default)',
                     command,
                     inspect(options)));
});

var child = parent.command('child <command>', 'child subcommand')
.option('-c, --child-option <c>', 'child option')
.action(function(command, options) {
  console.log(format('%s : %s, %s',
                     'child action',
                     command,
                     inspect(options)));
});

var childB = parent.command('child-b', 'child b')
.action(function(options) {
  console.log('child b');
});

var grandchildA = child
.command('grandchild-a', 'grandchild-a subcommand')
.action(function() {
  console.log('grandchild-a action');
});

var grandchildB = child
.command('grandchild-b', 'grandchild-b subcommand')
.action(function() {
  console.log('grandchild-b action');
});

parent.execute();

// $ node examples/subcommand.js
// parent action (default)
//
// $ node examples/subcommand.js -h
//   Usage: parent <command>
//
//   Commands:
//
//     child   child subcommand
//     child-b child b
//
//   Options:
//
//     -h, --help output usage information
//
// $ node examples/subcommand.js child
// child action
//
// $ node examples/subcommand.js child -h
//
//   Usage: child <command>
//
//   Commands:
//
//     grandchild-a grandchild-a subcommand
//     grandchild-b grandchild-b subcommand
//
//   Options:
//
//     -h, --help output usage information
//
// $ node examples/subcommand.js child grandchild-a
// grandchild-a action
//
// $ node examples/subcommand.js child grandchild-b
// grandchild-b action
//
