import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { getEnumKeyOrValue } from '../../libs/utilities';


type IInternalServerErrorResponseConstructor = {
   data?: any | any[] | null;
   message?: string;
}

export default class InternalServerErrorResponse extends HttpResponse {
   constructor({
      data = null,
      message = getEnumKeyOrValue(StatusCodes, StatusCodes.INTERNAL_SERVER_ERROR)
   }: IInternalServerErrorResponseConstructor) {
      super({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, data, message });
   }
}
