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
