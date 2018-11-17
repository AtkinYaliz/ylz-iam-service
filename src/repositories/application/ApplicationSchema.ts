import { SchemaDefinition, SchemaOptions } from 'mongoose';

import BaseSchema from '../BaseSchema';
import auditSchema from '../auditSchema';


export default class ApplicationSchema extends BaseSchema {
   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
      const applicationDefinition = {
         ...definition,
         
         name: {
            type: String,
            trim: true,
            required: [true, 'Name is required!'],
            minlength: [2, 'Name needs to be at least 2 chars!']
         },

         ...auditSchema
      };

      super(applicationDefinition, options);
   }
}
