
describe('Examples', function() {
  describe('examples/simple.js', function() {
    it('', function(done) {
      this.slow(300);
      this.exec('node examples/simple.js')
      .then(function(result) {
        expect(result).to.have.property('stdout', 'Yukiho is God.\n');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('-h', function(done) {
      this.slow(300);
      this.exec('node examples/simple.js -h')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            '',
            '  Usage: simple',
            '',
            '  Options: ',
            '',
            '    -h, --help    output usage information',
            '    -V, --version output the version number',
            '',
            ''
          ].join('\n')
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('-V', function(done) {
      this.slow(300);
      this.exec('node examples/simple.js -V')
      .then(function(result) {
        expect(result).to.have.property('stdout', '0.1.0\n');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });
  });

  describe('examples/options.js', function() {
    it('', function(done) {
      this.slow(300);
      this.exec('node examples/options.js')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: missing required argument `action\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });

    it('-h', function(done) {
      this.slow(300);
      this.exec('node examples/options.js -h')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            '',
            '  Usage: options <action>',
            '',
            '  Options: ',
            '',
            '    -b, --boolean    A boolean argument',
            '    -s, --string <s> A string argument',
            '    -h, --help       output usage information',
            '',
            ''
          ].join('\n')
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('-V', function(done) {
      this.slow(300);
      this.exec('node examples/options.js -V')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'Action  : -V',
            'Options : {}',
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('hoge', function(done) {
      this.slow(300);
      this.exec('node examples/options.js hoge')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'Action  : hoge',
            'Options : {}',
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('hoge -b', function(done) {
      this.slow(300);
      this.exec('node examples/options.js hoge -b')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'Action  : hoge',
            'Options : { boolean: true }',
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('hoge -b -s fuga', function(done) {
      this.slow(300);
      this.exec('node examples/options.js hoge -b -s fuga')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'Action  : hoge',
            'Options : { boolean: true, string: \'fuga\' }',
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('hoge -b -s fuga -XXX', function(done) {
      this.slow(300);
      this.exec('node examples/options.js hoge -b -s fuga -XXX')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: passing unknown argument `-XXX\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });
  });

  describe('examples/subcommand.js', function() {
    it('', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: missing required argument `command\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });

    it('-h', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js -h')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            '',
            '  Usage: parent <command>',
            '',
            '  Commands: ',
            '',
            '    child   child subcommand',
            '    child-b child b',
            '',
            '  Options: ',
            '',
            '    -h, --help output usage information',
            '',
            ''
          ].join('\n')
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('abc', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js abc')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout', 'parent action (default) : abc, {}\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js child')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: missing required argument `command\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });

    it('child -h', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js child -h')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            '',
            '  Usage: child <command>',
            '',
            '  Commands: ',
            '',
            '    grandchild-a grandchild-a subcommand',
            '    grandchild-b grandchild-b subcommand',
            '',
            '  Options: ',
            '',
            '    -c, --child-option <c> child option',
            '    -h, --help             output usage information',
            '',
            ''
          ].join('\n')
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child def', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js child def')
      .then(function(result) {
        expect(result).to.have.property('stdout', 'child action : def, {}\n');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child grandchild-a', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js child grandchild-a')
      .then(function(result) {
        expect(result).to.have.property('stdout', 'grandchild-a action\n');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child grandchild-a -h', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js child grandchild-a -h')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            '',
            '  Usage: grandchild-a',
            '',
            '  Options: ',
            '',
            '    -h, --help output usage information',
            '',
            ''
          ].join('\n')
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child grandchild-a ghi', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand.js child grandchild-a ghi')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: passing unknown argument `ghi\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });

  });

  describe('examples/subcommand-with-options.js', function() {
    it('', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: missing required argument `command\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });

    it('abc', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js abc')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'parent action : abc',
            '{}'
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('abc -p', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js abc -p')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'parent action : abc',
            '{ parentOption: true }'
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('abc -c', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js abc -c')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: passing unknown argument `-c\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });


    it('child', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js child')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'child action',
            '{}'
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child -c', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js child -c')
      .then(function(result) {
        expect(result).to.have.property(
          'stdout',
          [
            'child action',
            '{ childOption: true }'
          ].join('\n') + '\n'
        );
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('child -p', function(done) {
      this.slow(300);
      this.exec('node examples/subcommand-with-options.js child -p')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property(
          'stderr', 'Error: passing unknown argument `-p\'\n'
        );
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });
  });

  describe('examples/async.js', function() {
    it('0', function(done) {
      this.slow(300);
      this.exec('node examples/async.js 0')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 0);
      })
      .then(function() { done(); }, done);
    });

    it('2', function(done) {
      this.slow(300);
      this.exec('node examples/async.js 2')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 2);
      })
      .then(function() { done(); }, done);
    });
  });

  describe('examples/throw-error.js', function() {
    it('', function(done) {
      this.slow(300);
      this.exec('node examples/throw-error.js')
      .then(function(result) {
        expect(result).to.have.property('stdout', '');
        expect(result).to.have.property('stderr', '');
        expect(result).to.have.property('exitCode', 1);
      })
      .then(function() { done(); }, done);
    });
  });
});
