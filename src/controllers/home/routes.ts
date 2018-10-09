import { Router } from 'express';
import { checkSchema } from 'express-validator/check';

import validations from './validations';
import homeControllerInstance from './HomeController';
import validationHandler from '../../libs/validationHandler';

const router = Router();

router.route('/:id')
   .get(
      // auth,
      checkSchema(validations.getOne as any),
      validationHandler(validations.getOne as any),
      homeControllerInstance.getOne as any
   );

export default router;
