import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { TData } from './IResponse';


interface ICreatedResponseConstructor {
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
