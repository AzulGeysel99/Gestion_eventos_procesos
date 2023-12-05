const { getJwtToken, getHashPassword, verifyUserPassword } = require('../helpers/utils.js');
const { AuthModel } = require('../models/testusers.js');

const AuthService = {};

/**
 * @description
 * El método de servicio para iniciar sesión como usuario existente.
 * @param {string} email El correo del usuario.
 * @param {string} password La contraseña en texto plano del usuario.
 * @returns El usuario que inició sesión junto con el token de acceso.
 */
AuthService.logInUser = async (email, password) => {
  const user = await AuthModel.findUserByAttribute('email', email);

  if (user) {
    const authCheck = await verifyUserPassword(password, user.password);

    if (authCheck) {
      const jwtPayload = {
        userId: user.id,
        email: user.email
      };

      const token = getJwtToken(jwtPayload);

      return { user, token };
    }
    throw new Error('Contraseña incorrecta');
  }
  throw new Error('Correo incorrecto');
};

module.exports = { AuthService };