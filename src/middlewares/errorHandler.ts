import logger from 'ylz-logger';

import { EnvVars } from '../libs/constants';
import { PageNotFoundError, DuplicateKeyError, ValidationError, BadRequestError } from '../models/errors';
import { HttpResponse, UnprocessableResponse, BadRequestResponse, NotFoundResponse, InternalServerErrorResponse } from '../models/responses';

export default function errorHandler(nodeEnv: string) {
   return function errorHandler(err: any, req: any, res: any, next: any) {
      if (nodeEnv !== EnvVars.TEST) {
         logger.error(err);
      }

      let response: HttpResponse;

      switch(err.type) {
         case PageNotFoundError.name:
            response = new NotFoundResponse();
            break;
         case ValidationError.name:
            response = new UnprocessableResponse({
               data: err.data.map(e => ({
                  location: '',
                  param: e.path,
                  value: e.value,
                  msg: e.message
               })),
               message: err.message
            });
            break;
         case DuplicateKeyError.name:
            response = new UnprocessableResponse({
               message: err.message
            });
            break;
         case BadRequestError.name:
            response = new BadRequestResponse({
               message: err.message
            });
            break;
         case InternalServerErrorResponse.name:
         default:
            response = new InternalServerErrorResponse({ });
            break;
      }

      res
         .status(response.code)
         .json( response );
   }
}
