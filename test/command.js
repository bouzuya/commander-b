var option = require('../lib/option');
var command = require('../lib/command');

describe('Command', function() {
  describe('name()', function() {
    context('command(\'abc\').name()', function() {
      it('returns \'abc\'', function() {
        expect(command('abc').name()).to.equal('abc');
      });
    });

    context('command().name(\'abc\').name()', function() {
      it('returns \'abc\'', function() {
        expect(command().name('abc').name()).to.equal('abc');
      });
    });
  });

  describe('action()', function() {
    context('command().action(f).action()', function() {
      it('returns f', function() {
        var f = function() {};
        expect(command().action(f).action()).to.equal(f);
      });
    });
  });

  describe('version()', function() {
    context('command().version(\'0.1.0\').version()', function() {
      it('returns \'0.1.0\'', function() {
        expect(command().version('0.1.0').version()).to.equal('0.1.0');
      });
    });
  });

  describe('example()', function() {
    context('command().example(\'hoge\').example()', function() {
      it('returns [\'hoge\']', function() {
        expect(command().example('hoge').example()).to.deep.equal(['hoge']);
      });
    });
  });

  describe('option()', function() {
    context('command().option(\'--x\', \'y\')', function() {
      it('returns command', function() {
        var c = command();
        expect(c.option('--x', 'y')).to.equal(c);
      });
    });
  });

  describe('command()', function() {
    context('command().command(\'action\', \'action\')', function() {
      it('returns subcommand', function() {
        var c = command()
        expect(c.command('action', 'action')).to.not.equal(c);
      });
    });
  });

  describe('printVersion()', function() {
    beforeEach(function() {
      this.stdout = '';
      this.sinon.stub(console, 'log', function(s) {
        this.stdout += s;
      }.bind(this));
    });

    it('output the version number', function() {
      command().version('0.1.0').printVersion();
      this.sinon.restore();
      expect(this.stdout).to.equal('0.1.0');
    });
  });

  describe('printHelp()', function() {
    beforeEach(function() {
      this.stdout = '';
      this.sinon.stub(console, 'log', function(s) {
        this.stdout += s;
      }.bind(this));
    });

    context('default', function() {
      it('output help information', function() {
        command('mycommand').printHelp();
        this.sinon.restore();
        var help = [
          '',
          '  Usage: mycommand',
          '',
          '  Options: ',
          '',
          '    -h, --help output usage information',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
      });
    });

    context('has version', function() {
      it('output the version number', function() {
        command('mycommand').version('0.1.0').printHelp();
        this.sinon.restore();
        var help = [
          '',
          '  Usage: mycommand',
          '',
          '  Options: ',
          '',
          '    -h, --help    output usage information',
          '    -V, --version output the version number',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
      });
    });

    context('has option', function() {
      it('output the option information', function() {
        command('mycommand').option('-a, --all', 'all').printHelp();
        this.sinon.restore();
        var help = [
          '',
          '  Usage: mycommand',
          '',
          '  Options: ',
          '',
          '    -a, --all  all',
          '    -h, --help output usage information',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
      });
    });

    context('has args', function() {
      it('output arguments', function() {
        command('mycommand <src> <dst>').printHelp();
        this.sinon.restore();
        var help = [
          '',
          '  Usage: mycommand <src> <dst>',
          '',
          '  Options: ',
          '',
          '    -h, --help output usage information',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
      });
    });

    context('has command', function() {
      it('output commands', function() {
        var c = command('mycommand');
        c.command('subcommand', 'description')
        c.printHelp();
        this.sinon.restore();
        var help = [
          '',
          '  Usage: mycommand <command>',
          '',
          '  Commands: ',
          '',
          '    subcommand description',
          '',
          '  Options: ',
          '',
          '    -h, --help output usage information',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
      });
    });

    context('has example', function() {
      it('output examples', function() {
        var c = command('mycommand');
        c.example('mycommand abc def')
        c.example('mycommand ghi jkl')
        c.printHelp();
        var help = [
          '',
          '  Usage: mycommand',
          '',
          '  Options: ',
          '',
          '    -h, --help output usage information',
          '',
          '  Examples: ',
          '',
          '    mycommand abc def',
          '    mycommand ghi jkl',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
      });
    });
  });

  describe('execute()', function() {
    beforeEach(function() {
      this.stdout = '';
      this.exitCode = 0;
      this.sinon.stub(console, 'log', function(s) {
        this.stdout += s;
      }.bind(this));
      this.sinon.stub(process, 'exit', function(i) {
        this.exitCode = i;
      }.bind(this));
    });

    context('', function() {
      it('execute action', function() {
        command()
        .action(function() { console.log('action'); })
        .execute(['node', 'index.js']);
        this.sinon.restore();
        expect(this.stdout).to.equal('action');
        expect(this.exitCode).to.equal(0);
      });
    });

    context('-h', function() {
      it('output help information', function() {
        command()
        .action(function() { console.log('action'); })
        .execute(['node', 'index.js', '-h']);
        this.sinon.restore();
        var help = [
          '',
          '  Usage: index',
          '',
          '  Options: ',
          '',
          '    -h, --help output usage information',
          '',
        ].join('\n');
        expect(this.stdout).to.equal(help);
        expect(this.exitCode).to.equal(0);
      });
    });

    context('-V', function() {
      it('output the version number', function() {
        command()
        .version('0.1.0')
        .action(function() { console.log('action'); })
        .execute(['node', 'index.js', '-V']);
        this.sinon.restore();
        expect(this.stdout).to.equal('0.1.0');
        expect(this.exitCode).to.equal(0);
      });
    });

    context('subcommand', function() {
      it('execute subcommand action', function() {
        var p = command('command <command>');
        p.action(function() { console.log('action'); });
        p.command('subcommand').action(function() { console.log('sub'); });
        p.execute(['node', 'index.js', 'subcommand']);
        this.sinon.restore();
        expect(this.stdout).to.equal('sub');
        expect(this.exitCode).to.equal(0);
      });
    });
  });

  describe('_parseExpectedArgs', function() {
    beforeEach(function() { this.f = command._parseExpectedArgs; });

    context('command', function() {
      it('works', function() {
        expect(this.f('command')).to
        .deep.equal({ name: 'command', args: [] });
      });
    });

    context('command <arg1>', function() {
      it('works', function() {
        expect(this.f('command <arg1>')).to
        .deep.equal({
          name: 'command', args: [{ name: 'arg1', required: true }]
        });
      });
    });

    context('command [arg1]', function() {
      it('works', function() {
        expect(this.f('command [arg1]')).to
        .deep.equal({
          name: 'command', args: [{ name: 'arg1', required: false }]
        });
      });
    });

    context('command <arg1> <arg2>', function() {
      it('works', function() {
        expect(this.f('command <arg1> <arg2>')).to
        .deep.equal({
          name: 'command',
          args: [
            { name: 'arg1', required: true },
            { name: 'arg2', required: true }
          ]
        });
      });
    });

    context('command <arg1> [arg2]', function() {
      it('works', function() {
        expect(this.f('command <arg1> [arg2]')).to
        .deep.equal({
          name: 'command',
          args: [
            { name: 'arg1', required: true },
            { name: 'arg2', required: false }
          ]
        });
      });
    });
  });

  describe('_parseArgs', function() {
    beforeEach(function() {
      this.f = function(name, args) {
        return command._parseArgs(command(name)._args, args);
      };
    });

    context('name: \'\'', function() {
      beforeEach(function() { this.name = ''; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('parsed: []', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([]);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('unknowns: [1]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').that.deep.equal([1]);
        });
      });
    });

    context('name: \'<x>\'', function() {
      beforeEach(function() { this.name = 'command <x>'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('missings: [\'x\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').that.deep.equal(['x']);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('parsed: [1]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').deep.equal([1]);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('unknowns: [2]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([2]);
        });
      });
    });

    context('name: \'[x]\'', function() {
      beforeEach(function() { this.name = 'command [x]'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('parsed: [null]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([null]);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('parsed: [1]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1]);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('unknowns: [2]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([2]);
        });
      });
    });

    context('name: \'<x> <y>\'', function() {
      beforeEach(function() { this.name = 'command <x> <y>'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('missings: [\'x\', \'y\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['x', 'y']);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('missings: [\'y\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['y']);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('parsed: [1, 2]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, 2]);
        });
      });

      context('args: [1, 2, 3]', function() {
        beforeEach(function() { this.args = [1, 2, 3]; });
        it('unknowns: [3]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([3]);
        });
      });
    });

    context('name: \'<x> [y]\'', function() {
      beforeEach(function() { this.name = 'command <x> [y]'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('missings: [\'x\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['x']);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('parsed: [1, null]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, null]);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('parsed: [1, 2]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, 2]);
        });
      });

      context('args: [1, 2, 3]', function() {
        beforeEach(function() { this.args = [1, 2, 3]; });
        it('unknowns: [3]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([3]);
        });
      });
    });

    context('name: \'[x] <y>\'', function() {
      beforeEach(function() { this.name = 'command [x] <y>'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('missings: [\'y\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['y']);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('parsed: [null, 1]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([null, 1]);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('parsed: [1, 2]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, 2]);
        });
      });

      context('args: [1, 2, 3]', function() {
        beforeEach(function() { this.args = [1, 2, 3]; });
        it('unknowns: [3]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([3]);
        });
      });
    });

    context('name: \'<x> [y] <z>\'', function() {
      beforeEach(function() { this.name = 'command <x> [y] <z>'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('missings: [\'x\', \'z\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['x', 'z']);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('missings: [\'z\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['z']);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('parsed: [1, null, 2]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, null, 2]);
        });
      });

      context('args: [1, 2, 3]', function() {
        beforeEach(function() { this.args = [1, 2, 3]; });
        it('parsed: [1, 2, 3]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, 2, 3]);
        });
      });

      context('args: [1, 2, 3, 4]', function() {
        beforeEach(function() { this.args = [1, 2, 3, 4]; });
        it('unknowns: [4]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([4]);
        });
      });
    });

    context('name: \'[x] <y> [z]\'', function() {
      beforeEach(function() { this.name = 'command [x] <y> [z]'; });

      context('args: []', function() {
        beforeEach(function() { this.args = []; });
        it('missings: [\'y\']', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('missings').deep.equal(['y']);
        });
      });

      context('args: [1]', function() {
        beforeEach(function() { this.args = [1]; });
        it('parsed: [null, 1, null]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([null, 1, null]);
        });
      });

      context('args: [1, 2]', function() {
        beforeEach(function() { this.args = [1, 2]; });
        it('parsed: [1, 2, null]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, 2, null]);
        });
      });

      context('args: [1, 2, 3]', function() {
        beforeEach(function() { this.args = [1, 2, 3]; });
        it('parsed: [1, 2, 3]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('parsed').that.deep.equal([1, 2, 3]);
        });
      });

      context('args: [1, 2, 3, 4]', function() {
        beforeEach(function() { this.args = [1, 2, 3, 4]; });
        it('unknowns: [4]', function() {
          expect(this.f(this.name, this.args)).to
          .have.property('unknowns').deep.equal([4]);
        });
      });
    });
  });

  describe('_parseOptions', function() {
    beforeEach(function() {
      this.f = command._parseOptions;
    });

    context('-b, --boolean', function() {
      beforeEach(function() { this.option = option('-b, --boolean'); });

      context('--boolean', function() {
        it('{ boolean: true, _: [] }', function() {
          var parsed = this.f([this.option], ['--boolean']);
          expect(parsed).to.deep.equal({ boolean: true, _: [] });
        });
      });

      context('-b', function() {
        it('{ boolean: true, _: [] }', function() {
          var parsed = this.f([this.option], ['-b']);
          expect(parsed).to.deep.equal({ boolean: true, _: [] });
        });
      });
    });

    context('-s, --string <s>', function() {
      beforeEach(function() { this.option = option('-s, --string <s>'); });

      context('--string hoge', function() {
        it('{ string: "hoge", _: [] }', function() {
          var parsed = this.f(
            [this.option],
            ['--string', 'hoge']
          );
          expect(parsed).to.deep.equal({ string: 'hoge', _: [] });
        });
      });

      context('--string', function() {
        it('throws error', function() {
          expect(function() {
            this.f([this.option], ['--string']);
          }.bind(this)).throw('string required');
        });
      });

      context('-s hoge', function() {
        it('{ string: "hoge", _: [] }', function() {
          var parsed = this.f([this.option], ['-s', 'hoge']);
          expect(parsed).to.deep.equal({ string: 'hoge', _: [] });
        });
      });

      context('-s', function() {
        it('throws error', function() {
          expect(function() {
            this.f([this.option], ['-s']);
          }.bind(this)).throw('string required');
        });
      });
    });

    context('-o, --option [o]', function() {
      beforeEach(function() { this.option = option('-o, --option [o]'); });

      context('--option fuga', function() {
        it('{ option: "fuga", _: [] }', function() {
          var parsed = this.f([this.option], ['--option', 'fuga']);
          expect(parsed).to.deep.equal({ option: 'fuga', _: [] });
        });
      });

      context('--option', function() {
        it('{ option: true, _: [] }', function() {
          var parsed = this.f([this.option], ['--option']);
          expect(parsed).to.deep.equal({ option: true, _: [] });
        });
      });

      context('-o fuga', function() {
        it('{ option: "fuga", _: [] }', function() {
          var parsed = this.f([this.option], ['-o', 'fuga']);
          expect(parsed).to.deep.equal({ option: 'fuga', _: [] });
        });
      });

      context('-o', function() {
        it('{ option: true, _: [] }', function() {
          var parsed = this.f([this.option], ['-o']);
          expect(parsed).to.deep.equal({ option: true, _: [] });
        });
      });
    });

    context('-s <s>, -o [o]', function() {
      beforeEach(function() {
        this.options = [
          option('-s, --string <s>', ''),
          option('-o, --option [o]', ''),
        ];
      });

      context('abc -s hoge -o fuga def', function() {
        it('{ string: "hoge", option: "fuga", _: ["abc", "def"] }', function() {
          var parsed = this.f(
            this.options,
            ['abc', '-s', 'hoge', '-o', 'fuga', 'def']
          );
          expect(parsed).to.deep.equal({
            string: 'hoge', option: 'fuga', _: ['abc', 'def'] 
          });
        });
      });
    });
  });
});

