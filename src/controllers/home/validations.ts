import { isValidObjectId } from '../../libs/utilities';


const validations = Object.freeze({
   id: {
      in: ['query'],
      custom: {
         options: (id, { req }) => isValidObjectId(req.params.id),
         errorMessage: 'Wrong format!'
      }
   },
   name: {
      in: ['body'],
      isLength: {
         options: { min: 1 },
         errorMessage: 'Name should be at least 2 chars long!'
      },
   },
   address: {
      in: ['body'],
      isLength: {
         options: { min: 2 },
         errorMessage: 'Address should be at least 2 chars long!'
      },
   },
   phones: {
      in: ['body'],
      custom: {
        options: (phones: any[]) => Array.isArray(phones), //&& phones.length > 0 && phones.every(x => isValidObjectId(x)),
        errorMessage: "Phones should be a list of strings!",
      }
   }
});

/*
* The location of the field, can be one or more of [body, cookies, headers, params, query].
* If omitted, all request locations will be checked
* */
export default Object.freeze({

   // GET /api/homes
   list: {
      limit: {
         in: ['query'],
         isInt: true,
         optional: true,
         toInt: true,
         errorMessage: 'Wrong format'
      },
      skip: {
         in: ['query'],
         isInt: true,
         optional: true,
         toInt: true,
         errorMessage: 'Wrong format'
      }
   },

   // GET /api/homes/:id
   get: {
      id: validations.id
   },

   // POST /api/homes
   create: {
      name: validations.name,
      address: validations.address,
      phones: validations.phones
   },

   // PUT /api/homes/:id
   update: {
      id: validations.id,
      name: validations.name,
      address: validations.address,
      phones: validations.phones
   },

   // GET /api/homes/:id
   delete: {
      id: validations.id
   }
});
