// import { StatusCodes } from "../../libs/_constants";
// import IResponse, { TData } from "./IResponse";

// interface IHttpResponseConstructor {
//   code?: StatusCodes;
//   data?: TData;
//   message?: string;
// }

// export default abstract class HttpResponse implements IResponse {
//   public code: StatusCodes;
//   public data: any | any[] | null;
//   public message: string;
//   public timestamp: Date;

//   constructor({ code = StatusCodes.OK, data = null, message = "" }: IHttpResponseConstructor) {
//     this.code = code;
//     this.data = data;
//     this.message = message;
//     this.timestamp = new Date();
//   }
// }
