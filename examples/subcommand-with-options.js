var command = require('../'); // 'commander-b'

var parent = command('parent <command>')
.option('-p, --parent-option', 'parent option')
.action(function(command, options) {
  console.log('parent action : ' + command);
  console.log(options);
});

var child = parent.command('child', 'child subcommand')
.option('-c, --child-option', 'child option')
.action(function(options) {
  console.log('child action');
  console.log(options);
});

parent.execute();

// $ node examples/subcommand-with-options.js
// parent action : 
//
// $ node examples/subcommand.js -h
//   Usage: parent <command>
//
//   Commands:
//
//     child child subcommand
//
//   Options:
//
//     -h, --help output usage information
//
// $ node examples/subcommand.js child
// {}
//
// $ node examples/subcommand.js child -h
//
//   Usage: child <command>
//
//   Options:
//
//     -c, --child-option <c> child option
//     -h, --help             output usage information
//
// $ node examples/subcommand.js child -c hoge
// { 'child-option': 'hoge }
//
