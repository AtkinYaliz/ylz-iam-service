// import * as http from 'http';
import * as express from 'express';
import IConfig from './config/IConfig';


export default class Server {
   private app: express.Express;
   // private server?: http.Server;

   public static getInstance(config: IConfig) {
      if (!Server.instance) {
        Server.instance = new Server(config);
      }

      return Server.instance;
    }
    private static instance: Server;

   private constructor(private config: IConfig) {
      this.app = express();
      // this.server = undefined;
   }

   get application() {
      return this.app;
   }
}
