import * as dotenv from 'dotenv';
import logger from 'ylz-logger';

import IConfig from './config/IConfig';
import Server from './Server';
import * as Database from './services/Database';


dotenv.config();
//@ts-ignore
const envVars: IConfig = process.env;

const { nodeEnv, port, mongoUrl } = envVars;

Database.open(mongoUrl)
   .then(() => {
      const server = Server.getInstance(envVars);

      server.application.listen(port, () => {
         const ann = `|| App is running at port '${port}' in '${nodeEnv}' mode ||`;

         logger.log(`
   ${ann.replace(/[^]/g, "-")}
   ${ann}
   ${ann.replace(/[^]/g, "-")}
   ${"Press CTRL-C to stop\n"}
         `);
      });
   });
