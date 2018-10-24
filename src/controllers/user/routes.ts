import { Router } from 'express';
import { checkSchema } from 'express-validator/check';

import validations from './validations';
import userControllerInstance from './UserController';
import validationHandler from '../../middlewares/validationHandler';
import controllerAdapter from '../../middlewares/controllerAdapter';

const router = Router();

router.route('/')
   .get(
      // auth,
      checkSchema(validations.test as any),
      validationHandler(),
      controllerAdapter(userControllerInstance, 'getAll')
   );

export default router;
