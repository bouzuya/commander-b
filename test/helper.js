var Promise = require('q').Promise;
var childProcess = require('child_process');

global.expect = require('chai').expect;

beforeEach(function() {
  this.exec = function(command) {
    return new Promise(function(resolve, reject) {
      var result = {};
      var child = childProcess.exec(command, function(err, stdout, stderr) {
        result.error = err;
        result.stdout = stdout;
        result.stderr = stderr;
        resolve(result);
      });
      child.once('exit', function(code) { result.exitCode = code; });
    });
  };
});

