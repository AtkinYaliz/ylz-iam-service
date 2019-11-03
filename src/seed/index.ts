import logger from "@ylz/logger";

// import { forEachSync } from "../libs/utilities";
import applications from "./applications";
import ApplicationRepository from "../repositories/application/ApplicationRepository";

class Seed {
  private applicationRepository;

  constructor() {
    this.applicationRepository = new ApplicationRepository();
  }

  public async start() {
    try {
      const [applicationCount] = await Promise.all([this.applicationRepository.count()]);

      //#region [Applications]
      if (applicationCount === 0) {
        logger.info("Seeding applications into the database");

        await this.applicationRepository.insertMany(applications);
        logger.info("ApplicationRepository seeding completed successfully");
      }
      //#endregion
    } catch (err) {
      logger.error("error in seeding", err);
    }
  }
}
export default new Seed();
