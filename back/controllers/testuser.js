const {
  STATUS_CODES,
  cookieAttributeForJwtToken,
  dbErrorCodes,
  userAuthRequiredFields
} = require('../helpers/constants.js');
const { AppError } = require('../helpers/error.js');
const {
  isAvailable,
  saveCookie,
  sendResponse,
  validate
} = require('../helpers/utils.js');
const { AuthService } = require('../services/service.auth.js');

class AuthController {
  /**
   * @description
   * El método del controlador para iniciar sesión en un usuario existente
   * @param {object} req El objeto de solicitud
   * @param {object} res El objeto de respuesta
   * @param {object} next La siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación
   * @returns La información del usuario que inició sesión y el token de acceso
   */
  static async logInUser(req, res, next) {
    const { body: requestBody } = req;

    const allFieldsArePresent = isAvailable(requestBody, Object.values(userAuthRequiredFields));

    if (!allFieldsArePresent) return next(new AppError('El campo no puede estar vacío', STATUS_CODES.BAD_REQUEST));

    const { email, password } = requestBody;

    try {
      const { user, token: access_token } = await AuthService.logInUser(email, password);

      saveCookie(res, cookieAttributeForJwtToken, access_token);

      return sendResponse(res, STATUS_CODES.OK, 'El usuario se ha logueado correctamente', { userId: user.id, email: user.email });
    } catch (error) {
      next(
        new AppError(
          error.message || 'Error Interno del Servidor',
          (error.message === 'Correo incorrecto' || error.message === 'Contraseña incorrecta')
            ? STATUS_CODES.BAD_REQUEST
            : error.status || STATUS_CODES.INTERNAL_SERVER_ERROR,
          error.response || error
        )
      );
    }
  }

  /**
   * @description
   * El método del controlador para cerrar la sesión de un usuario
   * @param {object} req El objeto de solicitud
   * @param {object} res El objeto de respuesta
   * @param {object} next La siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación
   */
  static logOutUser(req, res, next) {
    if (req.cookies[`${cookieAttributeForJwtToken}`]) {
      res.clearCookie(cookieAttributeForJwtToken);

      return sendResponse(res, STATUS_CODES.OK, 'Se cerró sesión correctamente');
    }

    return next(new AppError('Debes iniciar sesión', STATUS_CODES.BAD_REQUEST));
  }
}

module.exports = { AuthController };