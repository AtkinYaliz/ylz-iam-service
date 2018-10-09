import { isValidObjectId } from '../../libs/utilities';


/*
* The location of the field, can be one or more of [body, cookies, headers, params, query].
* If omitted, all request locations will be checked
* */
export default Object.freeze({


   // GET /api/homes/:id
   getOne: {
      id: {
         in: ['query'],
         custom: {
            options: (id, { req }) => { console.log(req.params.id); isValidObjectId(req.params.id) },
            errorMessage: 'Wrong format'
         }
      }
   },
   //
   // // GET /api/homes
   // getAll: {
   //    limit: {
   //       in: ['query'],
   //       isInt: true,
   //       optional: true,
   //       toInt: true,
   //       errorMessage: 'Wrong format'
   //    },
   //    skip: {
   //       in: ['query'],
   //       isInt: true,
   //       optional: true,
   //       toInt: true,
   //       errorMessage: 'Wrong format'
   //    }
   // },
   //
   //
   //
   // // POST /api/homes/create
   // create: {
   //    name: {
   //       in: ['body'],
   //       errorMessage: 'Name is wrong!',
   //       isLength: {
   //          // Multiple options would be expressed as an array
   //          options: { min: 2 },
   //          errorMessage: 'Name should be at least 2 chars long'
   //       },
   //    }
   // },
   //
   // // GET /api/homes/:id
   // update: {
   //    id: {
   //       in: ['query'],
   //       custom: {
   //          options: (id: string) => {
   //             return isValidObjectId(id);
   //          },
   //       },
   //       errorMessage: 'Wrong format'
   //    },
   //    name: {
   //       in: ['body'],
   //       errorMessage: 'Name is wrong!',
   //       isLength: {
   //          // Multiple options would be expressed as an array
   //          options: { min: 2 },
   //          errorMessage: 'Name should be at least 2 chars long'
   //       },
   //    }
   // },
   //
   // // GET /api/homes/:id
   // delete: {
   //    id: {
   //       in: ['query'],
   //       custom: {
   //          options: (id: string) => {
   //             return isValidObjectId(id);
   //          },
   //       },
   //       errorMessage: 'Wrong format'
   //    }
   // }
});
