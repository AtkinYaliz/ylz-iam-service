import BaseError from './BaseError';


type DBErrorConstructor = {
   code?: number;
   message?: string;
}


export default abstract class DBError extends BaseError {
   code: number;

   constructor({ code = 0, message = '' }: DBErrorConstructor) {
      super(message);

      this.code = code;
   }
}
