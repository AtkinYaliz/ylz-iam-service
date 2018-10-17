import { StatusCodes } from '../../libs/constants';
import SystemResponse from './SystemResponse';


export interface ISuccessResponseInput{
   statusCode?: StatusCodes;
   data?: any | any[];
}

export default class SuccessResponse extends SystemResponse {
   constructor({ statusCode = StatusCodes.OK, data = null }: ISuccessResponseInput) {
      super({ statusCode, data });
   }
}
