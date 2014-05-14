module.exports = process.env.COMMANDER_B_COV
  ? require('./lib-cov/')
  : require('./lib/');
