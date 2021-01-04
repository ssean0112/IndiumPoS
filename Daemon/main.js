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

// Show logo and Version
Core.showLogo();

// Starting RPC server
rpcFastify.listen(3000, () => {
  Core.Log(chalk.hex(Colors.skyMagenta), 'RPC', 'RPC server has started at 0.0.0.0:3000');
});
  // Show help screen when specified
  if(Core.argHelp) {
    Core.showHelp();
  }

// Starting P2P server
io.listen(3001);
  // Show version
  if(Core.argVersion) {
    Core.showVersion();
  }

// Log
Core.Log(chalk.hex(Colors.purpleNavi), 'P2P', 'P2P server has started at 0.0.0.0:3000');

// On P2P
io.on('connection', socket => {
  socket.on('', msg => {

  });
});

// RPC requests 
RPC.getInfo(rpcFastify);