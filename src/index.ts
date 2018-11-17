import logger from 'ylz-logger';

// import IConfig from './config/IConfig';
import config from './config';
import Server from './Server';
import * as Database from './services/Database';


logger.debug( config );

const { nodeEnv, port, mongoUrl } = config;

Database.open(mongoUrl)
   .then(() => {
      Database.createInitials(['LH']);

      const server = Server.getInstance(config).application.listen(port);

      server.on('listening', () => {
         const ann = `|| App is running at port '${port}' in '${nodeEnv}' mode ||`;

         logger.log(`
      ${ann.replace(/[^]/g, "-")}
      ${ann}
      ${ann.replace(/[^]/g, "-")}
      ${"Press CTRL-C to stop"}
         `);
      });

      server.on('error', (err) => {
         logger.error('::: GOT ERROR IN STARTING SERVER :::');
         logger.error( err );
      });
   });
