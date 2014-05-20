var option = require('../lib/option');

describe('Option', function() {
  context('-i, --integer <n>, An integer argument', function() {
    before(function() {
      this.o = option('-i, --integer <n>', 'An integer argument');
    });

    describe('short()', function() {
      it('returns \'i\'', function() {
        expect(this.o.short()).to.equal('i');
      });
    });

    describe('long()', function() {
      it('returns \'integer\'', function() {
        expect(this.o.long()).to.equal('integer');
      });
    });

    describe('key()', function() {
      it('returns \'integer\'', function() {
        expect(this.o.key()).to.equal('integer');
      });
    });

    describe('hasArgs()', function() {
      it('returns true', function() {
        expect(this.o.hasArgs()).to.be.true;
      });
    });

    describe('argsRequired()', function() {
      it('returns true', function() {
        expect(this.o.argsRequired()).to.be.true;
      });
    });

    describe('description()', function() {
      it('returns \'An integer argument\'', function() {
        expect(this.o.description()).to.equal('An integer argument');
      });
    });
  });

  context('--integer <n>, An integer argument', function() {
    before(function() {
      this.o = option('--integer <n>', 'An integer argument');
    });

    describe('short()', function() {
      it('returns null', function() {
        expect(this.o.short()).to.be.null;
      });
    });

    describe('long()', function() {
      it('returns \'integer\'', function() {
        expect(this.o.long()).to.equal('integer');
      });
    });

    describe('key()', function() {
      it('returns \'integer\'', function() {
        expect(this.o.key()).to.equal('integer');
      });
    });

    describe('hasArgs()', function() {
      it('returns true', function() {
        expect(this.o.hasArgs()).to.be.true;
      });
    });

    describe('argsRequired()', function() {
      it('returns true', function() {
        expect(this.o.argsRequired()).to.be.true;
      });
    });

    describe('description()', function() {
      it('returns \'An integer argument\'', function() {
        expect(this.o.description()).to.equal('An integer argument');
      });
    });
  });

  context('--integer [n], An integer argument', function() {
    before(function() {
      this.o = option('--integer [n]', 'An integer argument');
    });

    describe('short()', function() {
      it('returns null', function() {
        expect(this.o.short()).to.be.null;
      });
    });

    describe('long()', function() {
      it('returns \'integer\'', function() {
        expect(this.o.long()).to.equal('integer');
      });
    });

    describe('key()', function() {
      it('returns \'integer\'', function() {
        expect(this.o.key()).to.equal('integer');
      });
    });

    describe('hasArgs()', function() {
      it('returns true', function() {
        expect(this.o.hasArgs()).to.be.true;
      });
    });

    describe('argsRequired()', function() {
      it('returns false', function() {
        expect(this.o.argsRequired()).to.be.false;
      });
    });

    describe('description()', function() {
      it('returns \'An integer argument\'', function() {
        expect(this.o.description()).to.equal('An integer argument');
      });
    });
  });

  context('--boolean, A boolean argument', function() {
    before(function() {
      this.o = option('--boolean', 'A boolean argument');
    });

    describe('short()', function() {
      it('returns null', function() {
        expect(this.o.short()).to.be.null;
      });
    });

    describe('long()', function() {
      it('returns \'boolean\'', function() {
        expect(this.o.long()).to.equal('boolean');
      });
    });

    describe('key()', function() {
      it('returns \'boolean\'', function() {
        expect(this.o.key()).to.equal('boolean');
      });
    });

    describe('hasArgs()', function() {
      it('returns false', function() {
        expect(this.o.hasArgs()).to.be.false;
      });
    });

    describe('argsRequired()', function() {
      it('returns false', function() {
        expect(this.o.argsRequired()).to.be.false;
      });
    });

    describe('description()', function() {
      it('returns \'A boolean argument\'', function() {
        expect(this.o.description()).to.equal('A boolean argument');
      });
    });
  });

  context('--dash-dash-dash <dash-dash>, dash! dash! dash!', function() {
    before(function() {
      this.o = option('--dash-dash-dash <dash-dash>', 'dash! dash! dash!');
    });

    describe('short()', function() {
      it('returns null', function() {
        expect(this.o.short()).to.be.null;
      });
    });

    describe('long()', function() {
      it('returns \'dash-dash-dash\'', function() {
        expect(this.o.long()).to.equal('dash-dash-dash');
      });
    });

    describe('key()', function() {
      it('returns \'dashDashDash\'', function() {
        expect(this.o.key()).to.equal('dashDashDash');
      });
    });

    describe('hasArgs()', function() {
      it('returns true', function() {
        expect(this.o.hasArgs()).to.be.true;
      });
    });

    describe('argsRequired()', function() {
      it('returns true', function() {
        expect(this.o.argsRequired()).to.be.true;
      });
    });

    describe('description()', function() {
      it('returns \'dash! dash! dash!\'', function() {
        expect(this.o.description()).to.equal('dash! dash! dash!');
      });
    });
  });
});
