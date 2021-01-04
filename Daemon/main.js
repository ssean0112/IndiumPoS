const Core = require('./Core.js');
const Colors = require('./Config/Colors.js');
const Config = require('./Config/Config.js');
const RPC = require('./RPC.js');
const P2PServer = require('./P2PServer.js');
const P2PClient = require('./P2PClient.js');
const Blockchain = require('./Blockchain.js');

const fastify = require('fastify');
const p2pSocketServer = require('socket.io')(fastify.server);
const p2pSocketClient = require('socket.io-client');
const chalk = require('chalk');
const setTitle = require('node-bash-title');

const rpcSocketServer = fastify();

(async() => {
  // Initializing passed arguments
  Core.InitArguments();
  setTitle(`${Config.coinName} Daemon v${Config.buildVersion} ${Config.buildName}`);

  // Show help screen when specified
  if(Core.argHelp) {
    Core.showHelp();
  }

  // Show version
  if(Core.argVersion) {
    Core.showVersion();
  }

  // Show logo and Version
  Core.showLogo();

  // Initializing before startup
  Core.Init();
  await Core.Sleep(100);

  // Starting RPC server
  rpcSocketServer.listen((Core.argRpcPort < 65536 ? Core.argRpcPort : 3001), () => {
    Core.Log(chalk.hex(Colors.skyMagenta), 'RPC', 'RPC server has started at 0.0.0.0:' + (Core.argRpcPort < 65536 ? Core.argRpcPort : 3001));
  });

  // Starting P2P server
  p2pSocketServer.listen((Core.argP2pPort < 65536 ? Core.argP2pPort : 3000));
  P2PServer.Init(p2pSocketServer);
  Core.Log(chalk.hex(Colors.purpleNavi), 'P2P', 'P2P server has started at 0.0.0.0:' + (Core.argP2pPort < 65536 ? Core.argP2pPort : 3000));
  
  // RPC requests 
  RPC.getInfo(rpcSocketServer, p2pSocketServer);
  await Core.Sleep(1000);

  // Connecting to peer list
  P2PClient.Init(p2pSocketClient);

  // Check blockchain validity
  Blockchain.check();

  Core.RefreshTitle(p2pSocketServer);
})();