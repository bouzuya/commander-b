var Promise = require('q').Promise;
var program = require('../'); // 'commander-b'

program('async <status>')
.action(function(status) {
  // return thenable
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      var n = parseInt(status, 10);
      if (n === 0) {
        resolve();
      } else {
        reject(n);
      }
    }, 10);
  });
})
.execute();

// $ node examples/async.js 0
// $ echo $?
// 0
//
// $ node examples/async.js 2
// $ echo $?
// 2
