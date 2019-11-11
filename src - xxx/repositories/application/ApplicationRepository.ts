import { Model } from "mongoose";
import logger from "@ylz/logger";

import { DuplicateKeyError, ValidationError } from "../../models/errors";
import BaseRepository from "../BaseRepository";
import applicationModel from "./applicationModel";
import IApplicationDocument from "./IApplicationDocument";
import { ICreateInput } from "./models";

export default class ApplicationRepository extends BaseRepository<IApplicationDocument> {
  constructor() {
    super(applicationModel);
  }

  public async create(input: ICreateInput): Promise<IApplicationDocument> {
    logger.debug("ApplicationRepository - create:", JSON.stringify(input));

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
