const Config = require('./Config/Config.js');

let RPC = {
  getInfo: function (rpc) {
    rpc.get('/getinfo', (req, res, next) => {
      res.send({
        'general': {
          'coinName': Config.coinName,
          'coinTicker': Config.coinTicker,
          'buildVersion': Config.buildVersion,
          'buildName': Config.buildName
        },
        'network': {
          'height': 0,
          'networkHeight': 0,
          'difficulty': 0,
          'totalTransactions': 0,
          'hashrate': 0,
          'synced': true,
        }
      });
    });
  }
}

module.exports = RPC;