import * as mongoose from "mongoose";

import { DuplicateKeyError, ValidationError } from "../models/errors";

import ApplicationRepository from "../repositories/application/ApplicationRepository";
import UserRepository from "../repositories/user/UserRepository";
import { forEachSync } from "../libs/utilities";
import logger from "ylz-logger";

export function open(mongoUrl: string) {
   return new Promise((resolve, reject) => {
      // Mongoose options
      const options = {
         autoIndex: true, // build indexes
         bufferMaxEntries: 0,
         keepAlive: 1,
         poolSize: 10, // Maintain up to 10 socket connections
         reconnectInterval: 500, // Reconnect every 500ms
         reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
         useNewUrlParser: true
      };

      // Mock the mongoose for testing purpose using Mockgoose
      // connect to mongo db
      mongoose.connect(
         mongoUrl,
         options
      );
      mongoose.connection.on("error", (err) => {
         // throw new Error(`unable to connect to database: ${mongoUri}`);
         reject(err);
      });
      mongoose.connection.on("connected", (err) => {
         resolve();
      });
   });
}

export function close() {
   return mongoose.disconnect();
}

export async function createCollections(createData) {
   // #region [Application Collection]
   const applicationRepo = new ApplicationRepository();
   const applicationCount = await applicationRepo.getCount();

   if (applicationCount === 0) {
      const newApplication = await applicationRepo.create({
         name: 'temp'
      });

      // #region [User Collection]
      const userRepo = new UserRepository();
      const userCount = await userRepo.getCount();

      if (userCount === 0) {
         const newUser = await userRepo.create({
            applicationId: newApplication.id,
            email: 'temp@temp.com',
            firstName: 'temp',
            lastName: 'temp',
            password: 'temptemp'
         });

         await userRepo.delete({ id: newUser.id });
      }
      // #endregion

      await applicationRepo.delete({ id: newApplication.id });
   }
   // #endregion
}
