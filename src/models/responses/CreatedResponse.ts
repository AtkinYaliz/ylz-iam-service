import HttpResponse from './HttpResponse';
import { StatusCodes } from '../../libs/constants';
import { TData } from './IResponse';


type ICreatedResponseConstructor = {
   data: TData;
}

export default class CreatedResponse extends HttpResponse {
   constructor({ data = null }: ICreatedResponseConstructor) {
      super({
         code: StatusCodes.CREATED,
         data
      });
   }
}
