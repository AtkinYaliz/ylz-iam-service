import BaseError from './BaseError';
import { getEnumKeyOrValue } from '../../libs/utilities';
import { StatusCodes } from '../../libs/constants';


export default class NotFoundError extends BaseError {
   name: string = 'NotFoundError';

   constructor() {
      super( getEnumKeyOrValue(StatusCodes, StatusCodes.NOT_FOUND) );
   }
}
