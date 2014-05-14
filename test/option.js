var option = require('../lib/option');

describe('Option', function() {
  describe('constructor', function() {
    context('-i, --integer <n>, An integer argument', function() {
      it('works', function() {
        var o = option('-i, --integer <n>', 'An integer argument');
        expect(o).to.have.property('_short', 'i');
        expect(o).to.have.property('_long', 'integer');
        expect(o).to.have.deep.property('_args.required', true);
        expect(o).to.have.property('_description', 'An integer argument');
      });
    });

    context('--integer <n>, An integer argument', function() {
      it('works', function() {
        var o = option('--integer <n>', 'An integer argument');
        expect(o).to.have.property('_short', null);
        expect(o).to.have.property('_long', 'integer');
        expect(o).to.have.deep.property('_args.required', true);
        expect(o).to.have.property('_description', 'An integer argument');
      });
    });

    context('--integer [n], An integer argument', function() {
      it('works', function() {
        var o = option('--integer [n]', 'An integer argument');
        expect(o).to.have.property('_short', null);
        expect(o).to.have.property('_long', 'integer');
        expect(o).to.have.deep.property('_args.required', false);
        expect(o).to.have.property('_description', 'An integer argument');
      });
    });

    context('--boolean, A boolean argument', function() {
      it('works', function() {
        var o = option('--boolean', 'A boolean argument');
        expect(o).to.have.property('_short', null);
        expect(o).to.have.property('_long', 'boolean');
        expect(o).to.have.property('_args', null);
        expect(o).to.have.property('_description', 'A boolean argument');
      });
    });

    context('--dash-dash-dash <dash-dash>, dash! dash! dash!', function() {
      it('works', function() {
        var o = option('--dash-dash-dash <dash-dash>', 'dash! dash! dash!');
        expect(o).to.have.property('_short', null);
        expect(o).to.have.property('_long', 'dash-dash-dash');
        expect(o).to.have.deep.property('_args.required', true);
        expect(o).to.have.property('_description', 'dash! dash! dash!');
      });
    });

  });
});
