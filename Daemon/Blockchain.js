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
        // Check if block difficulty is a valid type
        if(isNaN(block.difficulty)) {
          console.log('');
          Core.Danger(`Block '${i}' has not a valid difficulty\n`)
          Core.Warning('Daemon stopped because of an error')
          process.exit();
        }

        // Check if block version matches
        if(isNaN(block.version)) {
          console.log('');
          Core.Danger(`Block '${i}' has not a valid version\n`)
          Core.Warning('Daemon stopped because of an error')
          process.exit();
        } else {
          if(block.version !== Config.coinNetworkVersion) {
            console.log('');
            Core.Danger(`Block '${i}' has not a matching version\n`)
            Core.Warning('Daemon stopped because of an error')
            process.exit();
          }
        }

        // Check if previous block hash is a valid type
        if(typeof block.previousBlockHash !== "string" || block.previousBlockHash.length !== 64) {
          console.log('');
          Core.Danger(`Block '${i}' has not a valid previous block hash type\n`)
          Core.Warning('Daemon stopped because of an error')
          process.exit();
        }

        // Check if merkle root is a valid type
        if(typeof block.merkleRoot !== "string" || block.merkleRoot.length !== 64) {
          console.log('');
          Core.Danger(`Block '${i}' has not a valid merkle root type\n`)
          Core.Warning('Daemon stopped because of an error')
          process.exit();
        }

        // Check if timestamp is a valid type
        if(isNaN(block.timestamp)) {
          console.log('');
          Core.Danger(`Block '${i}' has not a valid timestamp\n`)
          Core.Warning('Daemon stopped because of an error')
          process.exit();
        }

        // Set current height
        Core.currentSyncHeight = i;
      }
    }

  }
}

module.exports = Blockchain;