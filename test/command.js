var option = require('../lib/option');
var command = require('../lib/command');

describe('Command', function() {
  describe('_parseExpectedArgs', function() {
    beforeEach(function() { this.f = command.prototype._parseExpectedArgs; });

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
        return command._parseArgs(new command(name)._args, args);
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
          }).throw(Error);
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
          }).throw(Error);
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

