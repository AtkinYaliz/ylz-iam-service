// import { Model } from "mongoose";
import { debug } from "@ylz/logger";
import { BaseRepository } from "@ylz/data-access";
import { DuplicateKeyError, ValidationError } from "@ylz/common/src/models/errors";

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
        throw new DuplicateKeyError("The name is in use!");
      } else if (err.name === ValidationError.name) {
        const data = [];
        for (const e in err.errors) {
          if (err.errors.hasOwnProperty(e)) {
            const { message, path, value } = err.errors[e];
            data.push({ message, path, value });
          }
        }
        throw new ValidationError(data);
      } else {
        throw err;
      }
    }
  }
}
