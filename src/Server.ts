// import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compress from 'compression';
import * as morganBody from 'morgan-body';

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

   get application() {
      return this.app;
   }
}
