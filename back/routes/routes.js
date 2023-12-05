const { AuthController } = require('../controllers/testuser.js');
const { AuthMiddlewares } = require('../middlewares/test_auth.js');

// Routes responsible for auth management
exports.authRoutes = (app) => {
  app.route('/signup').post(AuthMiddlewares.isAuthenticated, AuthController.signUpUser);

  app.route('/login').post(AuthMiddlewares.isAuthenticated, AuthController.logInUser);

  app.route('/logout').post(AuthController.logOutUser);
};