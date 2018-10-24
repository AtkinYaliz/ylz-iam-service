import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';


export default class NotFoundResponse extends HttpResponse {
   constructor() {
      super({
         statusCode: StatusCodes.NOT_FOUND,
         message: getEnumKeyOrValue(StatusCodes, StatusCodes.NOT_FOUND)
      });
   }
}
