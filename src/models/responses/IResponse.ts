import { StatusCodes } from '../../libs/constants';


export default interface IResponse {
   statusCode?: StatusCodes;
   data?: any | any[] | null;
   message?: string;
   timestamp?: Date;
}
