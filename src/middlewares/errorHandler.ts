import logger from 'ylz-logger';

import { EnvVars } from '../libs/constants';
import { NotFoundError, DuplicateKeyError } from '../models/errors';
import { HttpResponse, BadRequestResponse, NotFoundResponse, InternalServerErrorResponse } from '../models/responses';

export default function errorHandler(nodeEnv: string) {
   return function errorHandler(err: Error, req: any, res: any, next: any) {
      if (nodeEnv !== EnvVars.TEST) {
         logger.error( err );
      }

      let response: HttpResponse;

      switch(err.name) {
         case(NotFoundError.name):
            response = new NotFoundResponse();
            break;
         case(DuplicateKeyError.name):
            response = new BadRequestResponse({ data: err.message });
            break;
         case(InternalServerErrorResponse.name):
            response = new InternalServerErrorResponse({ });
            break;
         default:
            response = new InternalServerErrorResponse({ });
            break;
      }

      res
         .status(response.statusCode)
         .json( response );
   }
}
