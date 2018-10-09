import { Router } from 'express';
import { checkSchema } from 'express-validator/check';

import validations from './validations';
import homeControllerInstance from './HomeController';
import validationHandler from '../../libs/validationHandler';


const router = Router();

/**
 * @swagger
 * /homes:
 *   get:
 *     tags:
 *       - Home
 *     description: Returns all Home names
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Home
 *         schema:
 *           $ref: '#/definitions/Home'
 */
router.route('/')
  .get(
    // auth,
    checkSchema(validations.list as any),
    validationHandler(validations.list as any),
    homeControllerInstance.list as any
  );

/**
 * @swagger
 * /homes/:id:
 *   get:
 *     tags:
 *       - Home
 *     description: Returns a Home
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A Home
 *         schema:
 *           $ref: '#/definitions/Home'
 */
router.route('/:id')
   .get(
      // auth,
      checkSchema(validations.get as any),
      validationHandler(validations.get as any),
      homeControllerInstance.get as any
   );

export default router;
