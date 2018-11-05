import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';
import { TData } from './IResponse';


type IUnprocessableResponseConstructor = {
   data?: TData;
   message?: string
}

export default class UnprocessableResponse extends HttpResponse {
   constructor({
      data = null,
      message = getEnumKeyOrValue(StatusCodes, StatusCodes.UNPROCESSABLE)
   }: IUnprocessableResponseConstructor) {
      super({
         code: StatusCodes.UNPROCESSABLE,
         data,
         message
      });
   }
}
