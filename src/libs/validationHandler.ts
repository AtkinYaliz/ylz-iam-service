import { validationResult } from 'express-validator/check';
import { StatusCodes } from './constants';


export default function validationHandler(validations: Object) {
   return (req: any, res: any, next: any) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res
            .status(StatusCodes.UNPROCESSABLE)
            .json({ errors: errors.array() });
      }
      
      next();
   }
}
