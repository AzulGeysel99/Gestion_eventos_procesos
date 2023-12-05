const { Database } = require('../config/db.js');

class AuthModel {
  /**
   * @description
   * The following method fetches a user corresponding to a particular user attribute.
   * @param {string} attribute The attribute for which the user is to be fetched.
   * @param {any} value The value of the attribute.
   * @returns The user, if it exists.
   */
  static async findUserByAttribute(attribute, value) {
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const params = [value];

    const result = await Database.executeQuery(query, params);

    return result[0];
  }
}

module.exports = { AuthModel };