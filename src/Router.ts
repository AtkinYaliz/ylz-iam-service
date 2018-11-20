import * as express from 'express';
import logger from 'ylz-logger';

import Swagger from './libs/Swagger';
import { getPackageJson } from './libs/utilities';
import userRouter from './controllers/user/routes';
import homeRouter from './controllers/home/routes';
import IConfig from './config/IConfig';


export default class Router {
   router: any;

   public static getInstance(config: IConfig) {
      if (!Router.instance) {
         Router.instance = new Router(config);
      }

      return Router.instance;
   }
   private static instance: Router;

   private constructor(private config: IConfig) {
      this.router = express.Router();

      this.initSwaggerRoute();
      this.initDefaultRoutes();
      this.initControllerRoutes();
   }


   private initSwaggerRoute() {
      const { apiPrefix, swaggerUrl } = this.config;
      const swaggerDefinition = JSON.parse(this.config.swaggerDefinition);
      const swaggerSetup = new Swagger();

      // JSON route
      this.router.use(`${swaggerUrl}.json`, swaggerSetup.getRouter({ swaggerDefinition }));

      // UI route
      const { serve, setup } = swaggerSetup.getUI(apiPrefix + swaggerUrl);

      this.router.use(swaggerUrl, serve, setup);
   }

   private initDefaultRoutes() {
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
      this.router.get('/health-check', (req, res) => {
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
      this.router.get('/version', (req, res) => {
         const { version, name, description } = getPackageJson();

         // logger.log(`version = ${version}, name = ${name}, description = ${description}`);

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
   }

   private initControllerRoutes() {
      // mount email routes at /users
      this.router.use('/homes', homeRouter);

      // mount email routes at /users
      this.router.use('/users', userRouter);
   }
}
