import * as dotenv from 'dotenv';

import Server from './src/Server';


dotenv.config();
const envVars: NodeJS.ProcessEnv = process.env;

console.log( envVars.config );



const server = Server.getInstance(envVars);

server.application.listen(envVars.PORT, () => {
   const ann = `|| App is running at port '${envVars.PORT}' in '${envVars.NODE_ENV}' mode ||`;

   console.info(ann.replace(/[^]/g, "-"));
   console.info(ann);
   console.info(ann.replace(/[^]/g, "-"));
   console.info("Press CTRL-C to stop\n");
});

