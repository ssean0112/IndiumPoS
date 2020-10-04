const crypto = require('crypto');

const Encrypt = (text, secretKey) => {
  const cipher = crypto.createCipher('aes256', secretKey);
  let encrypted = cipher.update(text, 'utf8', 'base64') + cipher.final('base64');
  return encrypted;
};

const Decrypt = (hash, secretKey) => {
  try {
    const decipher = crypto.createDecipher('aes256', secretKey);
    let decrypted = decipher.update(hash, 'base64', 'utf-8') + decipher.final('utf-8');;
    return decrypted;
  } catch(e) {
    return 'error';
  }
};

module.exports = {
  Encrypt,
  Decrypt
};