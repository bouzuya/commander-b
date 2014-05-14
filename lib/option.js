var Option = function(name, description) {
  var match = name.match(/(-([A-Za-z]),)?\s*--([A-Za-z][A-Za-z0-9-]*)(\s+([\[<])[A-Za-z][A-Za-z0-9-]*[\]>])?/);
  var shortName = match[2] || null;
  var longName = match[3];
  var hasArgs = match[4];
  var argsRequired= (match[5] || '<').indexOf('<') === 0 ? true : false;
  this._name = name;
  this._short = shortName || null;
  this._long = longName;
  this._args = hasArgs ? { required: argsRequired } : null;
  this._description = description;
};

module.exports = function(name, description) {
  return new Option(name, description);
};

