import { Model } from 'mongoose';
import logger from 'ylz-logger';

import BaseRepository from '../BaseRepository';
import IApplicationDocument from './IApplicationDocument'
import applicationModel from './applicationModel';
import { ICreateInput } from './models'
import { DuplicateKeyError, ValidationError } from '../../models/errors';


export default class ApplicationRepository extends BaseRepository<IApplicationDocument, Model<IApplicationDocument>> {
   constructor() {
      super(applicationModel);
   }

   public async create(input: ICreateInput): Promise<IApplicationDocument> {
      logger.debug('ApplicationRepository - create', JSON.stringify(input));

      try {
         return await super.create(input);
      } catch (err) {
         if(err.code === 11000) {
            throw new DuplicateKeyError('The name is in use!');
         } else if(err.name === ValidationError.name) {
            let data = [];
            for(let e in err.errors){
               const { message, path, value } = err.errors[e];
               data.push({ message, path, value });
            }
            throw new ValidationError(data);
         } else {
            throw err;
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
}
