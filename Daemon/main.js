const Core = require('./Core.js');
const Colors = require('./Config/Colors.js');

const fastify = require('fastify');
const io = require('socket.io')(fastify.server);
const chalk = require('chalk');

const rpc = fastify();

// Show logo and Version
Core.showLogo();

// Starting RPC server
rpc.listen(3000, () => {
  Core.Log(chalk.hex(Colors.celeste), 'RPC', 'Server has started at 0.0.0.0:3000');
});

// Starting P2P server
io.listen(3001);

// On P2P
io.on('connection', socket => {
  socket.on('', msg => {

  });
});

// On RPC 
rpc.get("/url", (req, res, next) => {
  res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

// Log
Core.Log(chalk.magenta, 'P2P', 'Server has started at 0.0.0.0:3000');