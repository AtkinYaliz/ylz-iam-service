import { Router } from 'express';
import { checkSchema, validationResult } from 'express-validator/check';

import validations from './validations';
import userControllerInstance from './UserController';
import validationHandler from '../../libs/validationHandler';

const router = Router();

router.route('/')
  .get(
    // auth,
    checkSchema(validations.test as any),
    validationHandler(validations.getAll as any),
    userControllerInstance.getAll as any
  );

export default router;
