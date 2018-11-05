import BaseError, { TError } from './BaseError';


export default abstract class DBError extends BaseError {

   constructor(
      public type = DBError.name,
      public data: TError[],
      public message = ''
   ) {
      super(type, data, message);
   }
}
