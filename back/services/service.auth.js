import { getJwtToken, getHashPassword, verifyUserPassword } from '../helpers/utils.js';
import { AuthModel } from '../models/testusers.js';

export const AuthService = {};



/**
 * @descripción
 * el método de servicio para iniciar sesión como usuario existente
 * @param {string} correo el correo del usuario
 * @param {string} contraseña la contraseña en texto plano del usuario
 * @devuelve el usuario que inició sesión junto con el token de acceso
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
    } throw Error('Contraseña incorrecta');
  } throw Error('Correo incorrecto');
};