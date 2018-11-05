import { TError } from './BaseError';
import DBError from './DBError';


export default class ValidationError extends DBError {
   constructor(data: TError[]) {
      super(
         ValidationError.name,
         data,
         'Validation error!'
      );
   }
}
