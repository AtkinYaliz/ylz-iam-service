import { error, info } from "@ylz/logger";

import applications from "./applications";
import { ApplicationRepository } from "../repositories/application/ApplicationRepository";

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
        info("Seeding applications into the database");

        await this.applicationRepository.insertMany(applications);
        info("ApplicationRepository seeding completed successfully");
      }
      //#endregion
    } catch (err) {
      error("error in seeding", err);
    }
  }
}
export default new Seed();
