import * as mongoose from 'mongoose';
import logger from 'ylz-logger';

import ApplicationRepository from '../repositories/application/ApplicationRepository';
import { DuplicateKeyError, ValidationError } from '../models/errors';
import { forEachSync } from '../libs/utilities';


export function open(mongoUrl: string) {
   return new Promise((resolve, reject) => {
      // Mongoose options
      const options = {
         autoIndex: false, // Don't build indexes
         bufferMaxEntries: 0,
         keepAlive: 1,
         poolSize: 10, // Maintain up to 10 socket connections
         reconnectInterval: 500, // Reconnect every 500ms
         reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
         useNewUrlParser: true
      };

      // Mock the mongoose for testing purpose using Mockgoose
      // connect to mongo db
      mongoose.connect(mongoUrl, options);
      mongoose.connection.on('error', (err) => {
        // throw new Error(`unable to connect to database: ${mongoUri}`);
        reject(err);
      });
      mongoose.connection.on('connected', (err) => {
        resolve();
      });
   });
};

export function close() {
   return mongoose.disconnect();
};

export function createInitials(names) {
   const applicationRepo = new ApplicationRepository();

   forEachSync(names, async (name) => {
      try {
         await applicationRepo.create({ name });
      } catch(err) {
         if(err.type === DuplicateKeyError.name) {
            logger.info(`${err.message} ${name}`)
         } else if(err.type === ValidationError.name) {
            logger.info(`${err.message} ${name}`)
         }
      }
   });
   
}