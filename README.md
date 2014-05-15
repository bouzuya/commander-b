commander-b
==============================================================================

> Fine, we'll go to plan B... You got a plan B?
> Marcus Fenix

A helper library for Node.js command-line interfaces, inspired by [commander.js][visionmedia/commander.js].

[visionmedia/commander.js]: https://github.com/visionmedia/commander.js

Installation
------------------------------------------------------------------------------

    npm install bouzuya/commander-b

Examples
------------------------------------------------------------------------------

### examples/simple.js

    var command = require('commander-b');
    
    command()
    .version('0.1.0')
    .action(function() { console.log('Yukiho is God.'); })
    .execute();

### Run

    $ node examples/simple.js
    Yukiho is God.
    
    $ node examples/simple.js -h
    
      Usage: simple
      
      Options:
    
        -h, --help    output usage information
        -V, --version output the version number
    
    $ node examples/simple.js -V
    0.1.0

License
------------------------------------------------------------------------------

MIT

[![Build Status](https://travis-ci.org/bouzuya/commander-b.svg)](https://travis-ci.org/bouzuya/commander-b)
[![Coverage Status](https://coveralls.io/repos/bouzuya/commander-b/badge.png?branch=master)](https://coveralls.io/r/bouzuya/commander-b?branch=master)

