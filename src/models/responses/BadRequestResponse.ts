import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';
import { TData } from './IResponse';


type IBadRequestResponseConstructor = {
   data?: TData;
   message?: string;
}

export default class BadRequestResponse extends HttpResponse {
   constructor({
      data = null,
      message = getEnumKeyOrValue(StatusCodes, StatusCodes.BAD_REQUEST)
   }: IBadRequestResponseConstructor) {
      super({
         code: StatusCodes.BAD_REQUEST,
         data,
         message
      });
   }
}
