import { validationResult } from 'express-validator/check';

import { StatusCodes } from './constants';
import ErrorResponse from './responses/ErrorResponse';


export default function validationHandler(validations: Object) {
   return (req: any, res: any, next: any) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const response = new ErrorResponse({ statusCode: StatusCodes.UNPROCESSABLE, errors: errors.array() });

         return res
            .status(response.statusCode)
            .json(response);
      }

      next();
   }
}
