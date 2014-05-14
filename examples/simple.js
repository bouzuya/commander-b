var program = require('../'); // 'commander-b'

program()
.version('0.1.0')
.action(function() { console.log('Yukiho is God.'); })
.execute();

// $ node examples/simple.js
// Yukiho is God.
//
// $ node examples/simple.js -h
//
//   Usage: simple
//   
//   Options:
//
//     -h, --help    output usage information
//     -V, --version output the version number
//
// $ node examples/simple.js -V
// 0.1.0
//
