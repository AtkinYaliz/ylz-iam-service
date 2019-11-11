import { TError } from './BaseError';
import DBError from './DBError';


export default class DuplicateKeyError extends DBError {
   constructor(message: string = 'Duplicate key error!') {
      super(
         DuplicateKeyError.name,
         null,
         message
      );
   }
}
