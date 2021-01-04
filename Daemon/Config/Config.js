const JsonPackage = require('../package.json');

/* What are atomic units?
 * 1 coin is equal to 100000000 atomic units */

let Config = {
    coinName:                   "Indium",                   // This is the coin name
    coinTicker:                 "IND",                      // This is the coin ticker
    coinNetworkId:              "1NDN3T",                   // This is the coin network id
    coinNetworkVersion:         1000,                       // This is the coin network version
    
    buildVersion:               JsonPackage.version,        // This is the build version
    buildName:                  "BlueDragon",               // This is the build name

    difficultyTarget:           "60",                       // This is the difficulty target, also known as the amount of seconds it takes to mine a block

    premineAmount:              10000                       // Premine is specified in atomic units.
}

module.exports = Config;