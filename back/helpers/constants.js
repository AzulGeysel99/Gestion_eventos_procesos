module.exports.STATUS_CODES = {
  OK: 200,
  SUCCESSFULLY_CREATED: 201,
  REDIRECT: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

// Los campos obligatorios durante la autenticación del usuario
module.exports.userAuthRequiredFields = {
  EMAIL: 'email',
  PASSWORD: 'password'
};

// Códigos de error de la base de datos para el manejo de errores
module.exports.dbErrorCodes = {
  ER_DUP_ENTRY: 'ER_DUP_ENTRY'
};

// JWT vencimiento
module.exports.jwtExpiry = 1 * 60 * 60;

// Atributo de la cookie que se creará para guardar el token JWT
module.exports.cookieAttributeForJwtToken = 'jwt_token';