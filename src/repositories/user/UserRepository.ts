// import { Model } from "mongoose";
import logger from "@ylz/logger";
import { libs } from "@ylz/common";
import { Nullable } from "@ylz/common/src/libs/customTypes";
import { BadRequestError, DuplicateKeyError, ValidationError } from "@ylz/common/src/models/errors";
import { VersionableRepository } from "@ylz/data-access/src/repositories/versionable/VersionableRepository";

import userModel from "./userModel";
import { IUserDocument } from "./IUserDocument";
import { IGetInput, ISignupInput } from "./models";
import { ApplicationRepository } from "../application/ApplicationRepository";

export class UserRepository extends VersionableRepository<IUserDocument> {
  constructor() {
    super(userModel);
  }

  public async getUser(input: IGetInput): Promise<Nullable<IUserDocument>> {
    logger.debug("UserRepository - getUser:", JSON.stringify(input));

    return super.getOne(libs.utilities.plucks(["email", "applicationId"])(input));
  }

  public async signup(input: ISignupInput): Promise<IUserDocument> {
    logger.debug("UserRepository - signup:", JSON.stringify(input));

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

// public async signup(input: ISignupInput): Promise<IApplicationDocument> {
//    logger.info('ApplicationRepository - signup', JSON.stringify(input));

//    try {
//       return await super.create(input);
//    } catch (err) {
//       if(err.code === 11000) {
//          throw new DuplicateKeyError([{ message: 'This email is in use!', path: 'email', value: input.email}]);
//       } else if(err.name === 'ValidationError') {
//          let data = [];
//          for(let e in err.errors){
//             const { message, path, value } = err.errors[e];
//             data.push({ message, path, value });
//          }
//          throw new ValidationError(data);
//       } else {
//          throw err;
//       }
//    }
// }
