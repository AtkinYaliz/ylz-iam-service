import { validationResult } from 'express-validator/check';


export default function validationHandler(validations: Object) {
   return (req: any, res: any, next: any) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
         .status(422)
         .json({ errors: errors.array() });
      }
      next();
   }
}
