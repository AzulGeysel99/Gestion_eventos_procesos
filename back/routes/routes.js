import { AuthController } from '../controllers/testuser.js';
import { AuthMiddlewares } from '../middlewares/testusers.js';

// routes responsible for auth management
export const authRoutes = (app) => {
  app
    .route('/signup')
    .post(AuthMiddlewares.isAuthenticated, AuthController.signUpUser);

  app
    .route('/login')
    .post(AuthMiddlewares.isAuthenticated, AuthController.logInUser);

  app
    .route('/logout')
    .post(AuthController.logOutUser);
};