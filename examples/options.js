var inspect = require('util').inspect;
var command = require('../'); // 'commander-b'

command('options <action>')
.option('-b, --boolean', 'A boolean argument')
.option('-s, --string <s>', 'A string argument')
.action(function(action, options) {
  console.log('Action  : ' + action);
  console.log('Options : ' + inspect(options));
})
.execute();

// $ node example/options.js
//   Error: missing required argument `action'
//
// $ node example/options.js hoge --string fuga
// Action  : hoge
// Options : { string: 'fuga' }
//
// $ node example/options.js --boolean hoge
// Action  : hoge
// Options : { boolean: true }
//
// $ node examples/options.js -h
//
//   Usage: options <action>
//
//   Options:
//
//     -b, --boolean    A boolean argument
//     -s, --string <s> A string argument
//     -h, --help       output usage information
//
