const Config = require('./Config/Config.js');
const Core = require('./Core.js');
//const JSONdb = require('simple-json-db');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync((Core.argBlockchainFolder ? Core.argBlockchainFolder : 'blockchain') + '/blockchain.json')
const db = low(adapter)

let Blockchain = {
  check: function (rpc) {
    // Set default values for the database
    db.defaults({ blocks: [] }).write();

    // Loop all possible blocks and check if they are valid
    for(i = 0; i < Config.maxBlocks; i++) {
      let block = db.get('blocks').find({ height: i }).value()

      if(block == undefined) {
        break;
      } else {
        // Check if block difficulty is valid
        if(isNaN(block.difficulty)) {
          console.log('');
          Core.Danger(`Block '${i}' had not a valid difficulty\n`)
          Core.Warning('Daemon stopped because of an error')
          process.exit();
        }
        Core.currentSyncHeight = i;
      }
    }

  }
}

module.exports = Blockchain;