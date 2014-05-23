var program = require('../'); // 'commander-b'

program('throw-error')
.action(function(status) { throw new Error(); })
.execute();

// $ node examples/throw-error.js
// $ echo $?
// 1
