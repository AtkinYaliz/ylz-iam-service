// import { Model } from "mongoose";
import { debug } from "@ylz/logger";
import { errors } from "@ylz/common";
import { BaseRepository } from "@ylz/data-access";

import { ICreateInput } from "./models";
import applicationModel from "./applicationModel";
import { IApplicationDocument } from "./IApplicationDocument";

export class ApplicationRepository extends BaseRepository<IApplicationDocument> {
  constructor() {
    super(applicationModel);
  }

  public async create(input: ICreateInput): Promise<IApplicationDocument> {
    debug("ApplicationRepository - create:", JSON.stringify(input));

    try {
      return await super.create(input);
    } catch (err) {
      if (err.code === 11000) {
        throw new errors.DuplicateKeyError("The name is in use!");
      } else if (err.name === errors.DbValidationError.name) {
        const data = [];
        for (const e in err.errors) {
          if (err.errors.hasOwnProperty(e)) {
            const { message, path, value } = err.errors[e];
            data.push({ message, path, value });
          }
        }
        throw new errors.DbValidationError(data);
      } else {
        throw err;
      }
    }
  }
}
