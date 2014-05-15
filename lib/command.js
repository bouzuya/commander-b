var path = require('path');
var option = require('./option');

var helpOption = option('-h, --help', 'output usage information');
var versionOption = option('-V, --version', 'output the version number');

var parseExpectedArgs = function(commandName) {
  var c = commandName.split(' ');
  var name = c.shift();
  var args = c.map(function(i) {
    var m = i.match(/[\[<](\w+)[\]>]/);
    return { name: m[1], required: (m[0][0] === '<' ? true : false) };
  });
  return { name: name, args: args };
};

var parseArgs = function(a, args) {
  var optionCount = args.length - a.filter(function(i) {
    return i.required;
  }).length;
  var result = { unknowns: args.slice(), parsed: [], missings: [] };
  a.forEach(function(item) {
    if (item.required) {
      var value = result.unknowns.shift();
      if (typeof value === 'undefined') {
        result.missings.push(item.name);
        result.parsed.push(null);
      } else {
        result.parsed.push(value);
      }
    } else if (optionCount > 0) {
      optionCount--;
      result.parsed.push(result.unknowns.shift());
    } else {
      result.parsed.push(null);
    }
  });
  return result;
};

var parseOptions = function(options, args) {
  var setValue = function(result, option, value) {
    if (typeof value === 'undefined') {
      result[option.key()] = true;
    } else {
      result[option.key()] = value;
    }
  };

  var cached = null;
  var parsed = args.reduce(function(parsed, arg) {
    if (cached) {
      setValue(parsed, cached, arg);
      cached = null;
      return parsed;
    }

    var matchOption = options.some(function(option) {
      if ((arg === '-' + option.short()) || (arg === '--' + option.long())) {
        if (option.hasArgs()) {
          cached = option;
        } else {
          setValue(parsed, option);
        }
        return true;
      }
      return false;
    });

    if (!matchOption) {
      parsed._.push(arg);
    }

    return parsed;
  }, { _: [] });

  if (cached) {
    if (cached.argsRequired()) {
      throw new Error(cached.key() + ' required');
    } else {
      setValue(parsed, cached);
    }
  }

  return parsed;
};

var Command = function(name, description) {
  var parsed = this._parseExpectedArgs(name || '');
  this._name = parsed.name;
  this._args = parsed.args;
  this._description = description;
  this._action = function() {};
  this._version = null;
  this._examples = [];
  this._options = [];
  this._commands = {};
};

Command.prototype.name = function(name) {
  if (action) {
    this._name = name;
    return this;
  } else {
    return this._name;
  }
};

Command.prototype.action = function(action) {
  if (action) {
    this._action = action;
    return this;
  } else {
    return this._action;
  }
};

Command.prototype.version = function(version) {
  if (version) {
    this._version = version;
    return this;
  } else {
    return this._version;
  }
};

Command.prototype.example = function(example) {
  if (example) {
    this._examples.push(example);
    return this;
  } else {
    return this._examples;
  }
};

Command.prototype.option = function(name, description) {
  this._options.push(option(name, description));
  return this;
};

Command.prototype.command = function(name, description) {
  var command = new Command(name, description);
  this._commands[command._name] = command;
  return command;
};

Command.prototype.execute = function() {
  var args = process.argv;
  this._basename = path.basename(args[1], path.extname(args[1]));
  // FIXME: async
  process.exit(this._execute(args.slice(2)));
  return this;
};

Command.prototype._execute = function(args) {
  var parsed = this._parseOptions(args);
  var binded = this._parseArgs(parsed._);
  var subcommand = this._commands[binded.parsed[0]];
  if (subcommand) {
    args.splice(0, 1);
    return subcommand._execute(args);
  } else if (this._version && parsed.version) {
    this.printVersion();
    return 0;
  } else if (parsed.help) {
    this.printHelp();
    return 0;
  } else {
    if (binded.missings.length > 0) {
      this._printMissingArgs(binded.missings);
      return 1;
    } else if (binded.unknowns.length > 0) {
      this._printUnknownArgs(binded.unknowns);
      return 1;
    } else {
      var options = {};
      for (var key in parsed) {
        if (key !== '_') {
          options[key] = parsed[key];
        }
      }
      this._action.apply(this, binded.parsed.concat([options]));
    }
  }
  return 0;
};

Command.prototype.printVersion = function() {
  console.log(this.version());
};

Command.prototype.printHelp = function() {
  console.log(this.help());
};

Command.prototype.help = function() {
  var help = [];
  help.push('');
  help.push(this.usageHelp());
  var commandHelp = this.commandHelp();
  if (commandHelp) help.push(commandHelp);
  var optionHelp = this.optionHelp();
  if (optionHelp) help.push(optionHelp);
  var exampleHelp = this.exampleHelp();
  if (exampleHelp) help.push(exampleHelp);
  help.push('');
  return help.join('\n');
};

Command.prototype.usageHelp = function() {
  var args = (Object.keys(this._commands).length > 0 ? '<command>' : '');
  return '  Usage: ' + (this._name || this._basename) + (args ? ' ' + args : '');
};

Command.prototype.commandHelp = function() {
  if (Object.keys(this._commands).length === 0) {
    return '';
  }
  return [
    '',
    '  Commands: ',
    '',
    Object.keys(this._commands).map(function(name) {
      var desc = this._commands[name]._description;
      return '    ' + name + ' ' + (desc ? desc : '');
    }, this).join('\n'),
  ].join('\n');
};

Command.prototype.optionHelp = function() {
  var options = this._options.concat([helpOption]);
  options = this._version ? options.concat([versionOption]) : options;
  var width = options.reduce(function(w, o) {
    return Math.max(w, o._name.length);
  }, 0);
  var rpad = function(s, w) {
    while (s.length < w) s += ' ';
    return s;
  };
  return [
    '',
    '  Options: ',
    '',
    options.map(function(option) {
      return '    ' + rpad(option._name, width) + ' ' + option._description;
    }).join('\n'),
  ].join('\n');
};

Command.prototype.exampleHelp = function() {
  if (this._examples.length === 0) {
    return '';
  }
  return [
    '',
    '  Examples: ',
    '',
    this._examples.join('\n')
  ].join('\n');
};

Command.prototype._printMissingArgs = function(missings) {
  console.error('Error: missing required argument `' + missings[0] + '\'');
};

Command.prototype._printUnknownArgs = function(unknowns) {
  console.error('Error: passing unknown argument `' + unknowns[0] + '\'');
};

Command.prototype._parseOptions = function(args) {
  var options = this._options;
  var defaultOptions = [helpOption];
  if (this._version) defaultOptions.push(versionOption);
  return parseOptions(options.concat(defaultOptions), args);
};

Command.prototype._parseExpectedArgs = parseExpectedArgs;

Command.prototype._parseArgs = function(args) {
  return parseArgs(this._args, args);
};

module.exports = Command;
module.exports._parseOptions = parseOptions;
module.exports._parseArgs = parseArgs;

