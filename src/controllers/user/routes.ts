import { Router } from 'express';
import { checkSchema } from 'express-validator/check';

import authJWT from '../../middlewares/authJWT';
import authLocal from '../../middlewares/authLocal';
import controllerAdapter from '../../middlewares/controllerAdapter';
import validationHandler from '../../middlewares/validationHandler';
import userControllerInstance from './UserController';
import validations from './validations';

const router = Router();

router.route('/signup')
   .post(
      checkSchema(validations.signup as any),
      validationHandler(),
      controllerAdapter(userControllerInstance, 'signup')
   );

router.route('/signin')
   .post(
      checkSchema(validations.signin as any),
      validationHandler(),
      authLocal,
      controllerAdapter(userControllerInstance, 'signin')
   );

router.route('/change-password')
   .post(
      checkSchema(validations.changePassword as any),
      validationHandler(),
      authJWT,
      controllerAdapter(userControllerInstance, 'changePassword')
   );

export default router;
