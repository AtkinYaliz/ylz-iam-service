import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';


type IUnprocessableResponseConstructor = {
   data?: any | any[] | null;
}

export default class UnprocessableResponse extends HttpResponse {
   constructor({
      data = null
   }: IUnprocessableResponseConstructor) {
      super({
         statusCode: StatusCodes.UNPROCESSABLE,
         data,
         message: getEnumKeyOrValue(StatusCodes, StatusCodes.UNPROCESSABLE)
      });
   }
}
