// const { default: coreConfig } = require("./config/config.core"); // tslint:disable-line
import logger from "@ylz/logger";

import seed from "./seed";
import config from "./config";
import Server from "./Server";
import Database from "./services/Database";

const { nodeEnv, port, mongoUrl } = config;

// DB Connection
Database.open({ mongoUrl })
  .then(() => {
    seed.start();
  })
  .then(() => {
    const server = Server.getInstance(config);
    server.init();

    const runningServer = server.application.listen(config.port);

    runningServer.on("listening", async () => {
      const ann = `|| App is running at port "${config.port}" in "${config.nodeEnv}" mode ||`;

      logger.info(ann.replace(/[^]/g, "-"));
      logger.info(ann);
      logger.info(ann.replace(/[^]/g, "-"));
      logger.info("Press CTRL-C to stop\n");
    });

    runningServer.on("error", err => {
      console.log(":::::: GOT ERROR IN STARTING SERVER ::::::");
      logger.error(err);
    });

    runningServer.on("close", () => {
      console.log(`:::::: CLOSING SERVER RUNNING ON "${config.port}" IN "${config.nodeEnv}" MODE ::::::`);
    });
  })
  .catch(err => {
    console.log(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
    logger.error(err);
  });

// const server = Server.getInstance(config).application.listen(port);

// server.on("listening", () => {
//   const ann = `|| App is running at port '${port}' in '${nodeEnv}' mode ||`;
//   logger.debug(`
//       ${ann.replace(/[^]/g, "-")}
//       ${ann}
//       ${ann.replace(/[^]/g, "-")}
//       ${"Press CTRL-C to stop"}
//    `);

//   Database.open(mongoUrl)
//     .then(() => {
//       seed.start();
//     })
//     .then(async () => {
//       logger.debug("Database connected.");

//       try {
//         // const createData = require('../scripts/createData.json');
//         // await Database.createCollections(createData);
//       } catch (err) {
//         logger.error("::: GOT ERROR WHEN CREATING COLLECTIONS :::");
//         logger.error(err);
//       }
//     })
//     .catch(err => {
//       logger.error("::: GOT ERROR WHEN CONNECTING TO THE DATABASE :::");
//       logger.error(err);
//     });
// });

// server.on("error", err => {
//   logger.error("::: GOT ERROR IN STARTING SERVER :::");
//   logger.error(err);
// });
