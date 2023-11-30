import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtExpiry } from './constants.js';

/**
 * @descripción
 * el siguiente método es responsable de enviar una respuesta al cliente
 * @param {object} res el objeto de respuesta
 * @param {número} statusCode el código de estado http
 * @param {string} mensaje el mensaje que se enviará al cliente
 * @param {array} da como resultado el objeto resultante cuando la solicitud es exitosa
 * @param {object} error el objeto de error que se enviará al cliente, cuando exista
 */
export const sendResponse = (res, statusCode, message, result = [], error = {}) => {
  res.status(statusCode).json({
    statusCode,
    message,
    data: result,
    error,
  });
};

export const validate = {
 /**
   * @descripción
   * toma la contraseña en texto plano del usuario
   * y comprueba si la contraseña contiene:
   * 1. al menos 5 caracteres
   * 2. al menos 1 letra mayúscula
   * 3. al menos 1 letra minúscula
   * 4. al menos 1 número o carácter especial
   * @param {string} str la contraseña en texto plano del usuario
   * @returns {boolean} verdadero o falso según la verificación
   */
  password: (str) => {
    const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    return str.length >= 5 && regex.test(str);
  },
};

/**
 * @descripción
 * el siguiente método recibe un targetObject cuyas claves se verificarán
 * con la correspondiente matriz de campos obligatorios
 * @param {object} objeto targetObject cuyas claves se van a comprobar
 * @param {array} requireFieldsArray conjunto de campos que se verificarán en targetObject
 * @param {boolean} checkForAll el valor booleano para indicar si todos los campos de requireFieldsArr deben estar presentes en targetObj
 * @devuelve un booleano confirmando la coincidencia
 */
export const isAvailable = (targetObj, requiredFieldsArr, checkForAll = true) => {
  const targetKeysArr = Object.keys(targetObj);

  let match;
  if (checkForAll) match = requiredFieldsArr.every((field) => targetKeysArr.includes(field));
  else match = requiredFieldsArr.some((field) => targetKeysArr.includes(field));

  return match;
};

/**
 * @descripción
 * el siguiente método recibe la contraseña en texto plano del usuario y produce un hash de la misma
 * @param {string} contraseña la contraseña en texto plano del usuario
 * @devuelve el valor hash de la contraseña
 */
export const getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

/**
 * @descripción
 * el siguiente método recibe la contraseña del usuario desde la solicitud de inicio de sesión y la contraseña guardada en la base de datos
 * y luego verifica ambos
 * @param {string} PlainTextPassword la contraseña ingresada por el usuario durante el inicio de sesión
 * @param {string} hashPassword la contraseña extraída de la base de datos
 * @returns un booleano confirmando la verificación de contraseña
 */

export const verifyUserPassword = async (plainTextPassword, hashPassword) => {
  const validation = await bcrypt.compare(plainTextPassword, hashPassword);

  return validation;
};

/**
 * @descripción
 * el siguiente método crea un token jwt utilizando una carga útil de identificación de usuario y nombre de usuario
 * @param {object} jwtPayload la carga útil de jwt que consta de ID de usuario y nombre de usuario
 * @devuelve el token jwt
 */
export const getJwtToken = (jwtPayload) => jwt.sign(
  {
    userId: jwtPayload.userId,
    username: jwtPayload.username
  },
  process.env.JWT_SECRET,
  { expiresIn: jwtExpiry }
);

/**
 * @descripción
 * el siguiente método crea una cookie y la adjunta al objeto de respuesta
 * @param {object} res la respuesta que se enviará al cliente
 * @param {string} key la clave de la cookie que se creará
 * @param {string} valor el valor de la cookie que se creará
 */
export const saveCookie = (res, key, value) => res.cookie(key, value, { httpOnly: true, maxAge: jwtExpiry * 1000 });

/**
 * @descripción
 * el siguiente método recibe un token jwt y luego verifica el mismo
 * @param {string} token el token jwt que se va a verificar
 * @devuelve el token decodificado, si la verificación es exitosa
 */
export const verifyJwtToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken;
};