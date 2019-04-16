const bcrypt = require('bcrypt');
const config = require('config');

// Crypto actions
class Hasher {
  static async generateHash(str) { // Hashes given string
    try {
      return await bcrypt.hash(str, config.get('Hasher.saltRounds'));
    } catch (e) {
      throw new Error(e);
    }
  }

  static async compareStrWithHash(str, hash) { // Compares given string with given hash
    try {
      return await bcrypt.compare(str, hash);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Hasher;
