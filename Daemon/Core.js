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

  Init: function () {
    // Check for 'blockchain' directory
    if (!fs.existsSync("./" + (Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain'))) {
      fs.mkdirSync("./" + (Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain'));
    }

    fs.open('./' + (Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain') + '/p2p.json', 'r', function (err, fd) {
      if (err) {
        fs.writeFile('./' + (Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain') + '/p2p.json', '', function (err) {
          if (err) {
            console.log(err);
          }
          console.log("The file was saved!");
        });
      } else {
        try {
          data = fs.readFileSync('./' + (Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain') + '/p2p.json');
          data = JSON.parse(data);
          Core.Log(chalk.hex(Colors.keppel), 'P2P', `'p2p.json' has been found with ${data.p2p.length} peer(s)!`);
          Core.p2pJson = data;
        } catch (e) {
          Core.Log(chalk.hex(Colors.amaranthPurple), 'P2P', `'p2p.json' is invalid. Creating new one.`);
          fs.writeFile('./' + (Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain') + '/p2p.json', `{\n  "p2p": [\n  ]\n}`, function (err) {
          });
        }
      }
    });

    Core.daemonIdentifier = this.makeRandomId(16);
  },

  InitArguments: function () {
    process.argv.slice(2).forEach(function (val, index, array) {
      if(val.startsWith("-rpc-port=")) { Core.argRpcPort = val.split('=')[1]; Number(Core.argPort); }
      if(val.startsWith("-p2p-port=")) { Core.argP2pPort = val.split('=')[1]; Number(Core.argPort); }
      if(val.startsWith("-blockchain=")) { Core.argBlockchainFolder = val.split('=')[1]; }
      if(val.startsWith("-help")) { Core.argHelp = true; }
      if(val.startsWith("-version")) { Core.argVersion = true; }
    });
  },

  Sleep: function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  RefreshTitle: function (server) {
    setInterval(function() {
      setTitle(`${Config.coinName} Daemon v${Config.buildVersion} ${Config.buildName} | P2P: ${server.engine.clientsCount}/0 | Height: ${Core.currentSyncHeight}`);
    }, 2000);
  },
}

module.exports = Core;