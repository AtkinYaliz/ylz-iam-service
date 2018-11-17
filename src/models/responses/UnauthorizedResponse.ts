import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';


export default class UnauthorizedResponse extends HttpResponse {
   constructor() {
      super({
         code: StatusCodes.UNAUTHORIZED,
         message: getEnumKeyOrValue(StatusCodes, StatusCodes.UNAUTHORIZED)
      });
   }
}
