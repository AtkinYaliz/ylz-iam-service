import { StatusCodes } from '../../libs/constants';
import HttpResponse from './HttpResponse';


export default class NoContentResponse extends HttpResponse {
   constructor() {
      super({
         statusCode: StatusCodes.NO_CONTENT
      });
   }
}
