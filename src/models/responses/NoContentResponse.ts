import { StatusCodes } from '../../libs/constants';
import SuccessResponse, { ISuccessResponseInput } from './SuccessResponse';


export default class NoContentResponse extends SuccessResponse {
   constructor({ statusCode = StatusCodes.NO_CONTENT, data = null }: ISuccessResponseInput) {
      super({ statusCode, data });
   }
}
