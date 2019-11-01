import logger from "@ylz/logger";

import config from "./config";
import Server from "./Server";
import * as Database from "./services/Database";

logger.debug("Initial Configuration:", JSON.stringify(config, null, 2));

const { nodeEnv, port, mongoUrl } = config;

const server = Server.getInstance(config).application.listen(port);

server.on("listening", () => {
  const ann = `|| App is running at port '${port}' in '${nodeEnv}' mode ||`;
  logger.debug(`
      ${ann.replace(/[^]/g, "-")}
      ${ann}
      ${ann.replace(/[^]/g, "-")}
      ${"Press CTRL-C to stop"}
   `);

  Database.open(mongoUrl)
    .then(async () => {
      logger.debug("Database connected.");

      try {
        // const createData = require('../scripts/createData.json');
        // await Database.createCollections(createData);
      } catch (err) {
        logger.error("::: GOT ERROR WHEN CREATING COLLECTIONS :::");
        logger.error(err);
      }
    })
    .catch(err => {
      logger.error("::: GOT ERROR WHEN CONNECTING TO THE DATABASE :::");
      logger.error(err);
    });
});

server.on("error", err => {
  logger.error("::: GOT ERROR IN STARTING SERVER :::");
  logger.error(err);
});
