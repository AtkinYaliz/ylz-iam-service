import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';


export default class NoContentResponse extends HttpResponse {
   constructor() {
      super({
         code: StatusCodes.NO_CONTENT
      });
   }
}
