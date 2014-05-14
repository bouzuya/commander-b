var Command = require('./command');

module.exports = function(name) {
  return new Command(name);
};
