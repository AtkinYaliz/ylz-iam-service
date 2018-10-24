import DBError from './DBError';


export default class DuplicateKeyError extends DBError {
   name: string = 'DuplicateKeyError';

   constructor() {
      super({ code: 11000, message: 'Duplicate key error!' });
   }
}
