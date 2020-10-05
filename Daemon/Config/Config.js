const JsonPackage = require('../package.json');

let Config = {
    coinName:                   "Indium",
    coinTicker:                 "IND",
    coinNetworkId:              "1NDN3T",
    coinNetworkVersion:         1000,
    
    buildVersion:               JsonPackage.version,
    buildName:                  "BlueDragon",

    difficultyTarget:           "60",
}

module.exports = Config;