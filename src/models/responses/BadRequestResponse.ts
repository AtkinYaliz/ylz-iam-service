import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';


type IBadRequestResponseConstructor = {
   data?: any | any[] | null;
   message?: string;
}

export default class BadRequestResponse extends HttpResponse {
   constructor({
      data = null,
      message = getEnumKeyOrValue(StatusCodes, StatusCodes.BAD_REQUEST)
   }: IBadRequestResponseConstructor) {
      super({
         statusCode: StatusCodes.BAD_REQUEST,
         data,
         message
      });
   }
}
