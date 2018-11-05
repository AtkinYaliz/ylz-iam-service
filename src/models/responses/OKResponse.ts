import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';
import { TData } from './IResponse';


export type IOKResponseConstructor = {
   data?: TData;
}

export default class OKResponse extends HttpResponse {
   constructor({ data = null }: IOKResponseConstructor) {
      super({
         code: StatusCodes.OK,
         data
      });
   }
}
