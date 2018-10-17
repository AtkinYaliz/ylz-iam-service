import { StatusCodes } from '../../libs/constants';


export default interface IResponse {
   statusCode?: StatusCodes;
   data?: any | any[];
   message?: string;
   errors?: any[];
   timestamp?: Date;
}
