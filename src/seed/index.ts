import { error, info } from "@ylz/logger";

import applications from "./applications";
import homes from "./homes";
import { ApplicationRepository } from "../repositories/application/ApplicationRepository";
import { HomeRepository } from "../repositories/home/HomeRepository";

class Seed {
  private applicationRepository;
  private homeRepository;

  constructor() {
    this.applicationRepository = new ApplicationRepository();
    this.homeRepository = new HomeRepository();
  }

  public async start() {
    try {
      const [applicationCount, homeCount] = await Promise.all([this.applicationRepository.count(), this.homeRepository.count()]);

      //#region [Applications]
      if (applicationCount === 0) {
        info("Seeding applications into the database");

        await this.applicationRepository.insertMany(applications);
        info("ApplicationRepository seeding completed successfully");
      }
      //#endregion

      //#region [Homes]
      if (homeCount === 0) {
        info("Seeding homes into the database");

        await this.homeRepository.insertMany(homes);
        info("HomeRepository seeding completed successfully");
      }
      //#endregion
    } catch (err) {
      error("error in seeding", err);
    }
  }
}
export default new Seed();
