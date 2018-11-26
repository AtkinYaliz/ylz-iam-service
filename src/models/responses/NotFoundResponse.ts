import { StatusCodes } from '../../libs/constants';
import { getEnumKeyOrValue } from '../../libs/utilities';
import HttpResponse from './HttpResponse';


export default class NotFoundResponse extends HttpResponse {
   constructor() {
      super({
         code: StatusCodes.NOT_FOUND,
         message: getEnumKeyOrValue(StatusCodes, StatusCodes.NOT_FOUND)
      });
   }
}
