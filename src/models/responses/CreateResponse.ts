import { StatusCodes } from '../../libs/constants';
import SuccessResponse, { ISuccessResponseInput } from './SuccessResponse';


export default class CreateResponse extends SuccessResponse {
   constructor({ statusCode = StatusCodes.CREATED, data = null }: ISuccessResponseInput) {
      super({ statusCode, data });
   }
}
