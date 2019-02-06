import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morganBody from 'morgan-body';

import IConfig from './config/IConfig';
import { EnvVars } from './libs/constants';
import { errorHandler, pageNotFoundHandler } from './middlewares';
import Router from './Router';


export default class Server {
   get application() {
      return this.app;
   }

   public static getInstance(config: IConfig) {
      if (!Server.instance) {
         Server.instance = new Server(config);
      }

      return Server.instance;
   }
   private static instance: Server;
   private app: express.Express;

   private constructor(private config: IConfig) {

      this.app = express();

      this.initMiddlewares();
      this.initRoutes();
      this.initErrorHandler();
   }

   private initMiddlewares() {
      const { NODE_ENV } = this.config;

      if (NODE_ENV === EnvVars.PROD) {
         this.app.use(helmet());
         this.app.use(compress());
      }
      this.app.use(cookieParser());
      this.app.use(cors({
         optionsSuccessStatus: 200,
         origin: JSON.parse(this.config.CORS_ORIGIN)
         // credentials: true,
      }));
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({ extended: true }));
      if (NODE_ENV !== EnvVars.TEST) {
         morganBody(this.app);
      }
   }
   private initRoutes() {
      const { API_PREFIX } = this.config;
      const router = Router.getInstance(this.config).router;

      // mount all routes on /api path
      this.app.use(API_PREFIX, router);

      // catch 404 and forward to error handler
      this.app.use(pageNotFoundHandler);
   }
   private initErrorHandler() {
      const { NODE_ENV } = this.config;

      this.app.use(errorHandler(NODE_ENV));
   }
}
