import { StatusCodes } from '../../libs/constants';
import { getEnumKeyOrValue } from '../../libs/utilities';
import BaseError from './BaseError';


export default class PageNotFoundError extends BaseError {
   constructor() {
      super(PageNotFoundError.name, [], getEnumKeyOrValue(StatusCodes, StatusCodes.NOT_FOUND));
   }
}
