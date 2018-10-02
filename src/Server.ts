import * as http from 'http';
import * as express from 'express';


export default class Server {
   private app: express.Express;
   // private server?: http.Server;

   public static getInstance(config: any) {
      if (!Server.instance) {
        Server.instance = new Server(config);
      }

      return Server.instance;
    }
    private static instance: Server;

   private constructor(private config: any) {
      this.app = express();
      // this.server = undefined;
   }

   get application() {
      return this.app;
   }
}
