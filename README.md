![commander-b](https://cloud.githubusercontent.com/assets/1221346/17646328/8d72ba38-61ff-11e6-8e52-5cf10066b7a5.png)

> Fine, we'll go to plan B... You got a plan B?
>
> Marcus Fenix

commander-b is a helper library for Node.js command-line interfaces, inspired by [commander.js][visionmedia/commander.js].

[visionmedia/commander.js]: https://github.com/visionmedia/commander.js

Installation
------------------------------------------------------------------------------

    npm install commander-b

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

Badges
------------------------------------------------------------------------------

[![Build Status](https://travis-ci.org/bouzuya/commander-b.svg)](https://travis-ci.org/bouzuya/commander-b)
[![Coverage Status](https://img.shields.io/coveralls/bouzuya/commander-b.svg)](https://coveralls.io/r/bouzuya/commander-b?branch=master)

License
------------------------------------------------------------------------------

MIT
