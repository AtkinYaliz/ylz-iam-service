import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compress from 'compression';
import * as morganBody from 'morgan-body';
import Swagger from './libs/Swagger';

import logger from 'ylz-logger';
import router from './router';
import IConfig from './config/IConfig';
import { EnvVars } from './libs/constants';


export default class Server {
   private app: express.Express;

   public static getInstance(config: IConfig) {
      if (!Server.instance) {
         Server.instance = new Server(config);
      }

      return Server.instance;
   }
   private static instance: Server;

   private constructor(private config: IConfig) {

      this.app = express();

      this.initMiddlewares();
      this.initRoutes();
      this.initSwagger();
   }

   private initMiddlewares() {
      const { nodeEnv } = this.config;

      if(nodeEnv === EnvVars.PROD) {
         this.app.use(helmet());
         this.app.use(compress());
      }
      this.app.use(cookieParser());
      this.app.use(cors({
         optionsSuccessStatus: 200,
         origin: JSON.parse(this.config.corsOrigin)
         // credentials: true,
      }));
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      if (nodeEnv !== EnvVars.TEST) {
         morganBody(this.app);
      }
   }
   private initRoutes() {
      const { apiPrefix } = this.config;

      this.app.use(apiPrefix, router);
   }
   private initSwagger() {
      const swaggerDefinition = JSON.parse(this.config.swaggerDefinition),
         { swaggerUrl } = this.config,
         swaggerSetup = new Swagger();

      // JSON route
      this.app.use(`${swaggerUrl}.json`, swaggerSetup.getRouter({ swaggerDefinition }));

      // UI route
      const { serve, setup } = swaggerSetup.getUI(swaggerUrl);

      this.app.use(swaggerUrl, serve, setup);
   }

   get application() {
      return this.app;
   }
}
