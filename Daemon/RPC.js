const Config = require('./Config/Config.js');
const Core = require('./Core.js');

let RPC = {
  getInfo: function (rpc, server) {
    rpc.get('/getinfo', (req, res, next) => {
      res.send({
        'general': {
          'coinName': Config.coinName,
          'coinTicker': Config.coinTicker,
          'buildVersion': Config.buildVersion,
          'buildName': Config.buildName
        },
        'network': {
          'height': (Core.currentSyncHeight ? Core.currentSyncHeight : 0),
          'networkHeight': 0,
          'difficulty': Core.currentBlock.difficulty,
          'totalTransactions': 0,
          'hashrate': 0,
          'synced': true,
          'incommingConnections': server.engine.clientsCount,
          'outgoingConnections': 0
        }
      });
    });
  }
}

module.exports = RPC;