import { StatusCodes } from '../../libs/constants';
import { getEnumKeyOrValue } from '../../libs/utilities';
import HttpResponse from './HttpResponse';
import { TData } from './IResponse';


interface IBadRequestResponseConstructor {
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
