/* eslint-disable import/no-extraneous-dependencies */
import { STATUS_CODES, cookieAttributeForJwtToken } from '../helpers/constants.js';
import { AppError } from '../helpers/error.js';
import { verifyJwtToken } from '../helpers/utils.js';

export const AuthMiddlewares = {};

/**
 * @descripción
 * el siguiente middleware comprueba si un usuario ha iniciado sesión actualmente
 * y es para ser utilizado en todas las rutas privadas
 * @param {object} requiere el objeto de solicitud
 * @param {object} res el objeto de respuesta
 * @param {object} junto a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación
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
      return next(new AppError('no esta autorizado', STATUS_CODES.UNAUTHORIZED));
    }
  } else return next(new AppError('no esta autorizado', STATUS_CODES.UNAUTHORIZED));
};

/**
 * @descripción
 * el siguiente middleware comprueba si un usuario ya ha iniciado sesión
 * @param {object} requiere el objeto de solicitud
 * @param {object} res el objeto de respuesta
 * @param {object} junto a la siguiente función de middleware en el ciclo de solicitud-respuesta de la aplicación
 */
AuthMiddlewares.isAuthenticated = async (req, res, next) => {
  const token = req.cookies[`${cookieAttributeForJwtToken}`];

  if (!token) return next();
  return next(new AppError('Ya esta autentificado', STATUS_CODES.BAD_REQUEST));
};