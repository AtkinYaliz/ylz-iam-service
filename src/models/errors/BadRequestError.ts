import DBError from './DBError';


export default class BadRequestError extends DBError {
   constructor(message: string = 'Bad request error!') {
      super(
         BadRequestError.name,
         null,
         message
      );
   }
}
