// diferentes códigos de estado http que se utilizarán como parte de la respuesta
export const STATUS_CODES = {
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

// los campos obligatorios durante la autenticación del usuario
export const userAuthRequiredFields = {
  EMAIL: 'email',
  PASSWORD: 'password'
};


// códigos de error de la base de datos para el manejo de errores
export const dbErrorCodes = {
  ER_DUP_ENTRY: 'ER_DUP_ENTRY'
};

// jwt vencimiento
export const jwtExpiry = 1 * 60 * 60;

// atributo de la cookie que se creará para guardar el token jwt
export const cookieAttributeForJwtToken = 'jwt_token';