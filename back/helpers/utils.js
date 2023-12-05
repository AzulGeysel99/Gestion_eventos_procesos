const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtExpiry } = require('./constants.js');

/**
 * @description
 * El siguiente método es responsable de enviar una respuesta al cliente.
 * @param {object} res El objeto de respuesta.
 * @param {number} statusCode El código de estado HTTP.
 * @param {string} message El mensaje que se enviará al cliente.
 * @param {array} result El objeto resultante cuando la solicitud es exitosa.
 * @param {object} error El objeto de error que se enviará al cliente, cuando exista.
 */
const sendResponse = (res, statusCode, message, result = [], error = {}) => {
  res.status(statusCode).json({
    statusCode,
    message,
    data: result,
    error,
  });
};

const validate = {
  /**
   * @description
   * Toma la contraseña en texto plano del usuario y comprueba si la contraseña contiene:
   * 1. Al menos 5 caracteres
   * 2. Al menos 1 letra mayúscula
   * 3. Al menos 1 letra minúscula
   * 4. Al menos 1 número o carácter especial
   * @param {string} str La contraseña en texto plano del usuario.
   * @returns {boolean} Verdadero o falso según la verificación.
   */
  password: (str) => {
    const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    return str.length >= 5 && regex.test(str);
  },
};

/**
 * @description
 * El siguiente método recibe un targetObject cuyas claves se verificarán
 * con la correspondiente matriz de campos obligatorios.
 * @param {object} targetObj Objeto targetObject cuyas claves se van a comprobar.
 * @param {array} requiredFieldsArr Conjunto de campos que se verificarán en targetObject.
 * @param {boolean} checkForAll El valor booleano para indicar si todos los campos de requiredFieldsArr deben estar presentes en targetObj.
 * @returns Un booleano confirmando la coincidencia.
 */
const isAvailable = (targetObj, requiredFieldsArr, checkForAll = true) => {
  const targetKeysArr = Object.keys(targetObj);

  let match;
  if (checkForAll) match = requiredFieldsArr.every((field) => targetKeysArr.includes(field));
  else match = requiredFieldsArr.some((field) => targetKeysArr.includes(field));

  return match;
};

/**
 * @description
 * El siguiente método recibe la contraseña en texto plano del usuario y produce un hash de la misma.
 * @param {string} password La contraseña en texto plano del usuario.
 * @returns El valor hash de la contraseña.
 */
const getHashPassword = async (password) => {
  const salt = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
};

/**
 * @description
 * El siguiente método recibe la contraseña del usuario desde la solicitud de inicio de sesión y la contraseña guardada en la base de datos,
 * y luego verifica ambos.
 * @param {string} plainTextPassword La contraseña ingresada por el usuario durante el inicio de sesión.
 * @param {string} hashPassword La contraseña extraída de la base de datos.
 * @returns Un booleano confirmando la verificación de contraseña.
 */
const verifyUserPassword = async (plainTextPassword, hashPassword) => {
  const validation = await bcrypt.compare(plainTextPassword, hashPassword);

  return validation;
};

/**
 * @description
 * El siguiente método crea un token JWT utilizando una carga útil de identificación de usuario y nombre de usuario.
 * @param {object} jwtPayload La carga útil de JWT que consta de ID de usuario y nombre de usuario.
 * @returns El token JWT.
 */
const getJwtToken = (jwtPayload) => jwt.sign(
  {
    userId: jwtPayload.userId,
    username: jwtPayload.username
  },
  process.env.JWT_SECRET,
  { expiresIn: jwtExpiry }
);

/**
 * @description
 * El siguiente método crea una cookie y la adjunta al objeto de respuesta.
 * @param {object} res La respuesta que se enviará al cliente.
 * @param {string} key La clave de la cookie que se creará.
 * @param {string} value El valor de la cookie que se creará.
 */
const saveCookie = (res, key, value) => res.cookie(key, value, { httpOnly: true, maxAge: jwtExpiry * 1000 });

/**
 * @description
 * El siguiente método recibe un token JWT y luego verifica el mismo.
 * @param {string} token El token JWT que se va a verificar.
 * @returns El token decodificado, si la verificación es exitosa.
 */
const verifyJwtToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  return decodedToken;
};

module.exports = {
  sendResponse,
  validate,
  isAvailable,
  getHashPassword,
  verifyUserPassword,
  getJwtToken,
  saveCookie,
  verifyJwtToken,
};