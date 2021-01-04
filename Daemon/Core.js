const JsonPackage = require('./package.json');
const Config = require('./Config/Config.js');
const Colors = require('./Config/Colors.js');
const Ascii = require('./Config/Ascii.js');

const chalk = require('chalk');
const fs = require('fs');
const setTitle = require('node-bash-title');
const { Console } = require('console');

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
    console.log('    ' + chalk.hex(Colors.standardLight)(`${Config.coinName} Daemon v${JsonPackage.version}         Copyright © 2020, ${JsonPackage.author}  `));
    console.log('    ' + chalk.hex(Colors.standardLight)(`${Config.buildName}\n`));
  },

  showHelp: function () {
    console.log(`Usage:\n  ./${Config.coinName} [OPTION...]\n`);
    
    console.log(` Core options:`);
    console.log(`    -help                                         Display this help message`);
    console.log(`    -version                                      Display the version of the software\n`);
    
    console.log(` Daemon options:`);
    console.log(`    -blockchain=<folder>                          Specify the <folder> with a folder name\n`);

    console.log(` Network options:`);
    console.log(`    -p2p-port=<port>                              TCP Port for the P2P connection`);
    console.log(`    -rpc-port=<port>                              TCP Port for the RPC connection`);
    
    process.exit();
  },

  showVersion: function() {
    console.log(chalk.hex(Colors.standard)(`${Config.coinName} Daemon v${Config.buildVersion} ${Config.buildName}`))
    process.exit();
  },
  makeRandomId: function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
}

module.exports = Core;