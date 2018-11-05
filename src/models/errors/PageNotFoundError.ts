import BaseError from './BaseError';
import { getEnumKeyOrValue } from '../../libs/utilities';
import { StatusCodes } from '../../libs/constants';


export default class PageNotFoundError extends BaseError {
   constructor() {
      super(PageNotFoundError.name, [], getEnumKeyOrValue(StatusCodes, StatusCodes.NOT_FOUND));
   }
}
