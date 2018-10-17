import { StatusCodes } from '../../libs/constants';
import SystemResponse from './SystemResponse';


interface IErrorResponseInput {
   statusCode?: StatusCodes;
   message?: string;
   errors?: any[];
}

export default class ErrorResponse extends SystemResponse {
   constructor({
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
      message = '',
      errors = []
   }: IErrorResponseInput) {
      super({ statusCode, message, errors });
   }
}
