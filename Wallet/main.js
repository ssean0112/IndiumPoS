const Core = require('./Core.js');
const WalletEncryption = require('./WalletEncryption.js');

const logUpdate = require('log-update');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fs = require('fs');

(async () => {
  // Clear the console
  console.clear();

  while(true) {
    // Show logo and Version
    Core.showLogo();
  
    // Show startup menu
    await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'option',
        message: 'What would you like todo?',
        choices: [{
                    name: 'Open wallet                ' + chalk.hex('#8ed7ed')('Open a wallet.'),
                    value: 'open_wallet',
                  },
                  {
                    name: 'Create wallet              ' + chalk.hex('#8ed7ed')('Create a wallet.'),
                    value: 'create_wallet',
                  },
                  {
                    name: 'Restore from seed          ' + chalk.hex('#8ed7ed')('Restore a wallet from seed'),
                    value: 'restore_seed',
                  },
                  {
                    name: 'Restore from keys          ' + chalk.hex('#8ed7ed')('Restore a wallet from private keys'),
                    value: 'restore_keys',
                  },
                  {
                    name: 'Exit                       ' + chalk.hex('#8ed7ed')('Exit the wallet'),
                    value: 'exit',
                  }],
        filter: function (val) {
          return val.toLowerCase();
        },
      },
    ])
    .then(async (option) => {
      switch(option.option) {
        // Open wallet case
        case 'open_wallet':
          Core.Warning('Please note that the extension (.indium) will be append after your name', true);
          await inquirer.prompt({
            type: 'input',
            name: 'wallet_name',
            message: "What is your wallet file called?",
          }).then(async (wallet_name) => {
            try {
              if(fs.existsSync(wallet_name.wallet_name + '.indium')) {
                await inquirer.prompt({
                  type: 'password',
                  name: 'password',
                  mask: '*',
                  message: "What is password?",
                }).then(async (password) => {
                  // Open wallet file
                  let walletData = fs.readFileSync(wallet_name.wallet_name + '.indium', 'utf8');    
                  let walletDecrypt = WalletEncryption.Decrypt(walletData, password.password);
                  if(walletDecrypt == "error") {
                    Core.Danger('Your password is incorrect or your wallet has been corrupted', true);
                  } else {
                    // Wallet unlocked!
                    while(true) {
                      // Clear console and show logo
                      console.clear();
                      Core.showLogo();
                      
                      console.log(`    ${chalk.hex('#8ed7ed')('Locked Balance:   0.00000000 IND       Block Height: 42,069')} `);
                      console.log(`    ${chalk.hex('#8ed7ed')('Unlocked Balance: 0.00000000 IND       ')} `);
                      console.log(`    ${chalk.hex('#8ed7ed')('Staked Coins:     0.00000000 IND       ')} \n`);

                      await inquirer.prompt([
                        {
                          type: 'rawlist',
                          name: 'option',
                          message: 'What would you like todo?',
                          choices: [{
                                      name: 'Show Address               ' + chalk.hex('#8ed7ed')('Show your wallet address'),
                                      value: 'open_wallet',
                                    },
                                    {
                                      name: 'Send Coins                 ' + chalk.hex('#8ed7ed')('Send coins to somebody'),
                                      value: 'create_wallet',
                                    },
                                    {
                                      name: 'Backup Wallet              ' + chalk.hex('#8ed7ed')('Backup your wallet'),
                                      value: 'restore_seed',
                                    },
                                    {
                                      name: 'Resync                     ' + chalk.hex('#8ed7ed')('Resync your wallet from a certain height'),
                                      value: 'restore_keys',
                                    },
                                    {
                                      name: 'Change Password            ' + chalk.hex('#8ed7ed')('Change your wallet password'),
                                      value: 'restore_keys',
                                    },
                                    {
                                      name: 'Save Wallet                ' + chalk.hex('#8ed7ed')('Restore a wallet from private keys'),
                                      name: 'Save Wallet                ' + chalk.hex('#8ed7ed')('Save you wallet at this state'),
                                      value: 'restore_keys',
                                    },
                                    {
                                      name: 'Exit                       ' + chalk.hex('#8ed7ed')('Exit the wallet'),
                                      value: 'exit',
                                    }],
                          filter: function (val) {
                            return val.toLowerCase();
                          },
                        },
                      ])
                      .then(async (option) => {

                        switch(option.option) {
                          // Exit case
                          case 'exit':
                            process.exit();
                        }
                      });
                    }

                  }
                });
              } else {
                Core.Danger(`Wallet '${chalk.bold(wallet_name.wallet_name + '.indium')}' does not exist`, true);
              }
            } catch(err) {
              Core.Danger(`Something went terribly wrong...`, true);
              console.log(err);
              await Core.enterToContinue();
              process.exit();
            }

            // Press any key to continue
            await Core.enterToContinue();
            console.clear();
          });
          break;
        // Create wallet case
        case 'create_wallet':
          console.log(WalletEncryption.Encrypt("", "SecretKey"));
          await Core.enterToContinue();
          break;
        // Restore wallet from seed case
        case 'restore_seed':
          break;
        // Restore wallet from keys case
        case 'restore_keys':
          break;
        // Exit case
        case 'exit':
          process.exit();
      }
    });
  }

})();