import { StatusCodes } from '../constants';
import SystemResponse from './SystemResponse';


interface IErrorResponse {
   statusCode?: StatusCodes;
   message?: string;
   errors?: any[];
}

export default class ErrorResponse extends SystemResponse {
   constructor({
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
      message = '',
      errors = []
   }: IErrorResponse) {
      super({ statusCode, message, errors });
   }
}
