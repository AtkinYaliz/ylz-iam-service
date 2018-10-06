import { Router } from 'express';
import logger from 'ylz-logger';

import userRouter from './controllers/user/routes';
// import notificationRouter from './controllers/notification/routes';

// import * as appInfo from 'pjson';

const router = Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *       - General
 *     description: Health Check
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: I am OK
 */
router.get('/health-check', (req, res) => {
   res.send('I am OK');
});

/**
 * @swagger
 * /version:
 *   get:
 *     tags:
 *       - General
 *     description: Get Version
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Version Response
 *         schema:
 *           type: object
 *           properties:
 *             version:
 *               type: string
 *               description: Version of the API.
 *             name:
 *               type: string
 *               description: Name of the API.
 *             description:
 *               type: string
 *               description: Description of the API.
 */
router.get('/version', (req, res) => {
   const { version, name, description } = require('../../package.json');

   // logger.info(`version = ${version}, name = ${name}, description = ${description}`);

   if (!(typeof version && version)) {
      logger.error('An error occurred while trying to get version: Version not defined');

      res.status(400)
         .send(new Error('Version not defined'));
   }

   res.json({
      version,
      name,
      description
   });
});

// mount email routes at /users
router.use('/users', userRouter);

// // mount notification routes at /notifications
// router.use('/notifications', notificationRouter);

export default router;
