import { StatusCodes } from '../constants';


export default interface IResponse {
   statusCode?: StatusCodes;
   data?: any | any[];
   message?: string;
   errors?: any[];
   timestamp?: Date;
}
