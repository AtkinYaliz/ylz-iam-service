import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';


export type IOKResponseConstructor = {
   data?: any | any[] | null;
}

export default class OKResponse extends HttpResponse {
   constructor({ data = null }: IOKResponseConstructor) {
      super({
         statusCode: StatusCodes.OK,
         data
      });
   }
}
