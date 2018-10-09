import { StatusCodes } from '../constants';
import SystemResponse from './SystemResponse';

interface ISuccessResponse{
   statusCode?: StatusCodes;
   data?: any | any[];
}

export default class SuccessResponse extends SystemResponse {
   constructor({ statusCode = StatusCodes.OK, data = null }: ISuccessResponse) {
      super({ statusCode, data });
   }
}
