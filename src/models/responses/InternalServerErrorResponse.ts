import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';
import { TData } from './IResponse';


type IInternalServerErrorResponseConstructor = {
   data?: TData;
   message?: string;
}

export default class InternalServerErrorResponse extends HttpResponse {
   constructor({
      data = null,
      message = getEnumKeyOrValue(StatusCodes, StatusCodes.INTERNAL_SERVER_ERROR)
   }: IInternalServerErrorResponseConstructor) {
      super({
         code: StatusCodes.INTERNAL_SERVER_ERROR,
         data,
         message
      });
   }
}
