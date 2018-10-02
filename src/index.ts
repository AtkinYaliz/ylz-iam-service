import * as dotenv from 'dotenv';

import IConfig from './config/IConfig';
import Server from './Server';


dotenv.config();
//@ts-ignore
const envVars: IConfig /*NodeJS.ProcessEnv*/ = process.env;

//@ts-ignore
console.log( envVars.database );


const server = Server.getInstance(envVars);

server.application.listen(envVars.PORT, () => {
   const ann = `|| App is running at port '${envVars.PORT}' in '${envVars.NODE_ENV}' mode ||`;

   console.info("\n");
   console.info(ann.replace(/[^]/g, "-"));
   console.info(ann);
   console.info(ann.replace(/[^]/g, "-"));
   console.info("Press CTRL-C to stop\n");
});
