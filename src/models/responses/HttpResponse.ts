import { StatusCodes } from '../../libs/constants';
import IResponse from './IResponse';


type IHttpResponseConstructor = {
   statusCode?: StatusCodes;
   data?: any | any[] | null;
   message?: string;
}

export default abstract class HttpResponse implements IResponse {
   public statusCode: StatusCodes;
   public data: any | any[] | null;
   public message: string;
   public timestamp: Date;

   constructor({
      statusCode = StatusCodes.OK,
      data = null,
      message = '',
   }: IHttpResponseConstructor) {
      this.statusCode = statusCode;
      this.data = data;
      this.message = message;
      this.timestamp = new Date();
   }
}













//
//
// interface IResponse {
//   data: any | any[];
//   metadata: {
//     timestamp: Date;
//     message: string;
//     code: string;
//   };
// }
//
//
// class SystemResponse {
//   public static getStatusCodes(code: StatusCodes) {
//     switch (code) {
//       case StatusCodes.BAD_REQUEST:
//         return {
//           code: StatusCodes.BAD_REQUEST,
//           message: 'Bad Request'
//         };
//
//       case StatusCodes.NOT_FOUND:
//         return {
//           code: StatusCodes.NOT_FOUND,
//           message: 'Page Not found'
//         };
//
//       case StatusCodes.UNPROCESSABLE:
//         return {
//           code: StatusCodes.UNPROCESSABLE,
//           message: 'Validation Error'
//         };
//
//       case StatusCodes.INTERNAL_SERVER_ERROR:
//         return {
//           code: StatusCodes.INTERNAL_SERVER_ERROR,
//           message: 'Internal Server Error'
//         };
//     }
//   }
//
//   public static success(response: IResponse): IResponse {
//     return response;
//   }
//
//   public static badRequestError(errors: IError[]) {
//     return SystemResponse.error(StatusCodes.BAD_REQUEST, errors);
//   }
//
//   public static serverError(errors: IError[]) {
//     return SystemResponse.error(StatusCodes.INTERNAL_SERVER_ERROR, errors);
//   }
//
//   public static validationError(errors: IError[]) {
//     return SystemResponse.error(StatusCodes.UNPROCESSABLE, errors);
//   }
//
//   public static notFoundError(errors: IError[]) {
//     return SystemResponse.error(StatusCodes.NOT_FOUND, errors);
//   }
//
//   private static error(code: StatusCodes, errors: IError[]) {
//     const status = SystemResponse.getStatusCodes(code);
//     return new APIError(status.message, status.code, errors);
//   }
// }
//
// export default SystemResponse;
