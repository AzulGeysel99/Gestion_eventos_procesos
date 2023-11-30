import { Database } from '../config/db.js';

export class AuthModel {
  

  /**
   * @description
   * the following method fetches a user corresponding to a particular user attribute
   * @param {string} attribute the attribute for which the user is to be fetched
   * @param {any} value the value of the attribute
   * @returns the user, if exists
   */
  static async findUserByAttribute(attribute, value) {
    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    const params = [value];

    const result = await Database.executeQuery(query, params);

    return result[0];
  }
}