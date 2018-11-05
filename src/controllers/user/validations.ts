import { isValidObjectId } from '../../libs/utilities';
import * as validator from 'validator';


const validations = Object.freeze({
   id: {
      in: ['query'],
      custom: {
         options: (id, { req }) => isValidObjectId(req.params.id),
         errorMessage: 'Wrong format!'
      }
   },
   email: {
      in: ['body'],
      isLength: {
         options: { min: 5 },
         errorMessage: 'Email should be at least 5 chars long!'
      },
      custom: {
         options: (email) => validator.isEmail(email),
         errorMessage: 'Not a valid email!'
      }
   },
   password: {
      in: ['body'],
      isLength: {
         options: { min: 6 },
         errorMessage: 'Password should be at least 6 chars long!'
      }
   },
   applicationId: {
      in: ['body'],
      isLength: {
         options: { min: 5 },
         errorMessage: 'Application ID should be at least 5 chars long!'
      }
   }
});

/*
* The location of the field, can be one or more of [body, cookies, headers, params, query].
* If omitted, all request locations will be checked
* */
export default Object.freeze({

   // POST /api/signup
   signup: {
      email: validations.email,
      password: validations.password,
      applicationId: validations.applicationId
   }
});
