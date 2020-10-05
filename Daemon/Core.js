const Ascii = require('./Config/Ascii.js');
const JsonPackage = require('./package.json');
const Config = require('./Config/Config.js');
const Colors = require('./Config/Colors.js');

const chalk = require('chalk');

var Core = {
  currentLogLevel: 1,

  Log: function (color, type, msg) {
    console.log(color('[' + type + '] ') + msg);
  },

  Warning: function (msg, linebreak) {
    console.log((linebreak ? '\n' : '') + chalk.hex('#eb9a31').bold('!') + ` ${msg}`);
  },

  Danger: function (msg, linebreak) {
    console.log((linebreak ? '\n' : '') + chalk.hex('#fc3838').bold('!') + ` ${msg}`);
  },

  showLogo: function () {
    console.log(chalk.hex(Colors.standard)(Ascii.Logo) + "\n");
    console.log('    ' + chalk.hex(Colors.standardLight)(`${Config.CoinName} Daemon v${JsonPackage.version}         Copyright © 2020, ${JsonPackage.author}  \n`));
  }
}

module.exports = Core;