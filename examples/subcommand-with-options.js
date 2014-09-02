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

parent.command('child-with-args <args>', 'child with args')
.option('-c, --child-option', 'child option')
.action(function(args, options) {
  console.log('child-with-args action');
  console.log(args);
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
//     child           child subcommand
//     child-with-args child with args
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
// { childOption: 'hoge' }
//
