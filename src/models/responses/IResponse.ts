import { StatusCodes } from '../../libs/constants';


export type TData = any | any[] | null;

export default interface IResponse {
   code: StatusCodes;
   data?: TData;
   message?: string;
   timestamp?: Date;
}
