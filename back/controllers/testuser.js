import {
  STATUS_CODES,
  cookieAttributeForJwtToken,
  dbErrorCodes,
  userAuthRequiredFields
} from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import {
  isAvailable,
  saveCookie,
  sendResponse,
  validate
} from '../helpers/utils.js';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
 
/**
   * @descripción
   * el método del controlador para iniciar sesión en un usuario existente
   * @param {object} requiere el objeto de solicitud
   * @param {object} res el objeto de respuesta
   * @param {object} junto a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación
   * @devuelve la información del usuario que inició sesión y el token de acceso
   */
  static async logInUser(req, res, next) {
    const { body: requestBody } = req;

    const allFieldsArePresent = isAvailable(requestBody, Object.values(userAuthRequiredFields));

    if (!allFieldsArePresent) return next(new AppError('El campo no puede estar vacio', STATUS_CODES.BAD_REQUEST));

    const { email, password } = requestBody;

    try {
      const { user, token: access_token } = await AuthService.logInUser(email, password);

      saveCookie(res, cookieAttributeForJwtToken, access_token);

      return sendResponse(res, STATUS_CODES.OK, 'el usuario se logueo correctamente', { userId: user.id, email: user.email });
    } catch (error) {
      next(
        new AppError(
          error.message || 'Error Interno del Servidor',
          error.message === 'Correo incorecto'
          || error.message === 'Contraseña incorrecta'
            ? STATUS_CODES.BAD_REQUEST
            : error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @descripción
   * el método del controlador para cerrar la sesión de un usuario
   * @param {object} requiere el objeto de solicitud
   * @param {object} res el objeto de respuesta
   * @param {object} junto a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación
   */
  static logOutUser(req, res, next) {
    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.clearCookie(cookieAttributeForJwtToken);

      return sendResponse(res, STATUS_CODES.OK, 'Se cerro sesion correctamente');
    }

    return next(new AppError('Debes iniciar sesion', STATUS_CODES.BAD_REQUEST));
  }
}