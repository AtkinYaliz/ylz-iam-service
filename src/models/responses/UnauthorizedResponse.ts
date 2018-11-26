import { StatusCodes } from '../../libs/constants';
import { getEnumKeyOrValue } from '../../libs/utilities';
import HttpResponse from './HttpResponse';


export default class UnauthorizedResponse extends HttpResponse {
   constructor() {
      super({
         code: StatusCodes.UNAUTHORIZED,
         message: getEnumKeyOrValue(StatusCodes, StatusCodes.UNAUTHORIZED)
      });
   }
}
