import { Router } from 'express';
import { checkSchema } from 'express-validator/check';

import validations from './validations';
import userControllerInstance from './UserController';
import validationHandler from '../../middlewares/validationHandler';
import controllerAdapter from '../../middlewares/controllerAdapter';
import authLocal from '../../middlewares/authLocal';
import authJWT from '../../middlewares/authJWT';

const router = Router();

router.route('/signup')
   .post(
      checkSchema(validations.signup as any),
      validationHandler(),
      controllerAdapter(userControllerInstance, 'signup')
   );

router.route('/login')
   .post(
      checkSchema(validations.login as any),
      validationHandler(),
      authLocal,
      controllerAdapter(userControllerInstance, 'login')
   );

router.route('/change-password')
   .post(
      checkSchema(validations.changePassword as any),
      validationHandler(),
      authJWT,
      controllerAdapter(userControllerInstance, 'changePassword')
   );

export default router;
