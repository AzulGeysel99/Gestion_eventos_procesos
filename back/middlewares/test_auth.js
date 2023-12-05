/* eslint-disable import/no-extraneous-dependencies */
const { STATUS_CODES, cookieAttributeForJwtToken } = require('../helpers/constants.js');
const { AppError } = require('../helpers/error.js');
const { verifyJwtToken } = require('../helpers/utils.js');

const AuthMiddlewares = {};

/**
 * @description
 * El siguiente middleware comprueba si un usuario ha iniciado sesión actualmente
 * y es para ser utilizado en todas las rutas privadas.
 * @param {object} req El objeto de solicitud.
 * @param {object} res El objeto de respuesta.
 * @param {object} next La siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación.
 */
AuthMiddlewares.checkAuth = async (req, res, next) => {
  const token = req.cookies[`${cookieAttributeForJwtToken}`];

  if (token) {
    try {
      const decodedToken = verifyJwtToken(token);

      res.locals.user = {
        id: decodedToken.userId,
        username: decodedToken.username,
      };
      next();
    } catch (error) {
      return next(new AppError('No está autorizado', STATUS_CODES.UNAUTHORIZED));
    }
  } else {
    return next(new AppError('No está autorizado', STATUS_CODES.UNAUTHORIZED));
  }
};

/**
 * @description
 * El siguiente middleware comprueba si un usuario ya ha iniciado sesión.
 * @param {object} req El objeto de solicitud.
 * @param {object} res El objeto de respuesta.
 * @param {object} next La siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación.
 */
AuthMiddlewares.isAuthenticated = async (req, res, next) => {
  const token = req.cookies[`${cookieAttributeForJwtToken}`];

  if (!token) {
    return next();
  } else {
    return next(new AppError('Ya está autentificado', STATUS_CODES.BAD_REQUEST));
  }
};

module.exports = { AuthMiddlewares };