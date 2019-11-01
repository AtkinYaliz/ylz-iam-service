import { Model } from "mongoose";
import logger from "@ylz/logger";

import { Nullable } from "../../libs/Nullable";
import { plucks } from "../../libs/utilities";
import { BadRequestError, DuplicateKeyError, ValidationError } from "../../models/errors";
import ApplicationRepository from "../application/ApplicationRepository";
import BaseRepository from "../BaseRepository";
import IUserDocument from "./IUserDocument";
import { IGetInput, ISignupInput } from "./models";
import userModel from "./userModel";

export default class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(userModel);
  }

  public async getUser(input: IGetInput): Promise<Nullable<IUserDocument>> {
    logger.debug("UserRepository - getByEmail", JSON.stringify(input));

    return super.getOne(plucks(["email", "applicationId"])(input));
  }

  public async signup(input: ISignupInput): Promise<IUserDocument> {
    logger.debug("UserRepository - signup", JSON.stringify(input));

    const application = await new ApplicationRepository().get({ id: input.applicationId });

    if (!application) {
      throw new BadRequestError("The application does not exist or you don't have permission!");
    }

    try {
      return await super.create(input);
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateKeyError("The email is in use!");
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
