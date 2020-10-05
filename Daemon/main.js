const Core = require('./Core.js');
const Colors = require('./Config/Colors.js');
const RPC = require('./RPC.js');

const fastify = require('fastify');
const io = require('socket.io')(fastify.server);
const chalk = require('chalk');

const rpcFastify = fastify();

// Show logo and Version
Core.showLogo();

// Starting RPC server
rpcFastify.listen(3000, () => {
  Core.Log(chalk.hex(Colors.skyMagenta), 'RPC', 'RPC server has started at 0.0.0.0:3000');
});

// Starting P2P server
io.listen(3001);

// Log
Core.Log(chalk.hex(Colors.purpleNavi), 'P2P', 'P2P server has started at 0.0.0.0:3000');

// On P2P
io.on('connection', socket => {
  socket.on('', msg => {

  });
});

// RPC requests 
RPC.getInfo(rpcFastify);