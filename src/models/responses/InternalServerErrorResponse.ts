import { StatusCodes } from '../../libs/constants';
import { getEnumKeyOrValue } from '../../libs/utilities';
import HttpResponse from './HttpResponse';
import { TData } from './IResponse';


interface IInternalServerErrorResponseConstructor {
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
