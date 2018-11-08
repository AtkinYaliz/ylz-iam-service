import BaseError, { TError } from './BaseError';
import { Nullable } from '../../libs/Nullable';


export default abstract class DBError extends BaseError {

   constructor(
      public type = DBError.name,
      public data: Nullable<TError[]>,
      public message = ''
   ) {
      super(type, data, message);
   }
}
