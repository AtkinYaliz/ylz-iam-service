import { validationResult } from 'express-validator/check';

import { StatusCodes } from '../libs/constants';
import { UnprocessableResponse } from '../models/responses';


export default function validationHandler() {

   return (req: any, res: any, next: any) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         const response = new UnprocessableResponse({ data: errors.array() });

         return res
            .status(response.code)
            .json(response);
      }

      next();
   };
}
