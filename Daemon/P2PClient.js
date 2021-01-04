const Core = require('./Core.js');
const Colors = require('./Config/Colors.js');

let P2PClient = {
  Init: function (io) {
    if(Core.p2pJson.p2p.length) {
      for(i = 0; i < Core.p2pJson.p2p.length; i++) {
        let url = Core.p2pJson.p2p[i].split(':');
        const socket = io.connect(`ws://${url[0]}:${url[1]}`);
        socket.emit('sendIdentifier', {
          daemonIdentifier: Core.daemonIdentifier
        });
      }
    }
  }
}

module.exports = P2PClient;