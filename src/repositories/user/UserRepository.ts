import { Model } from 'mongoose';
import logger from 'ylz-logger';

import BaseRepository from '../BaseRepository';
import IUserDocument from './IUserDocument'
import userModel from './userModel';
import { ISignupInput } from './models'
import { Nullable } from '../../libs/Nullable';
import { DuplicateKeyError, ValidationError, BadRequestError } from '../../models/errors';
import ApplicationRepository from '../application/ApplicationRepository';


export default class UserRepository extends BaseRepository<IUserDocument, Model<IUserDocument>> {
   constructor() {
      super(userModel);
   }

   public async signup(input: ISignupInput): Promise<IUserDocument> {
      logger.debug('UserRepository - signup', JSON.stringify(input));

      const applicationRepo = new ApplicationRepository();
      const application = await applicationRepo.get({ id: input.applicationId });

      if (!application) {
         throw new BadRequestError('The application does not exist or you don\'t have permission!');
      }

      try {
         return await super.create(input);
      } catch (err) {
         if (err.code === 11000) {
            throw new DuplicateKeyError('This email is in use!');
         } else if (err.name === ValidationError.name) {
            let data = [];
            for (let e in err.errors) {
               const { message, path, value } = err.errors[e];
               data.push({ message, path, value });
            }
            throw new ValidationError(data);
         } else {            
            throw err;
         }
      }
   }
}
