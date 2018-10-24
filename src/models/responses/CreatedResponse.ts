import HttpResponse from './HttpResponse';
import { StatusCodes } from '../../libs/constants';


type ICreatedResponseConstructor = {
   data: any | any[] | null;
}

export default class CreatedResponse extends HttpResponse {
   constructor({ data = null }: ICreatedResponseConstructor) {
      super({ statusCode: StatusCodes.CREATED, data });
   }
}
