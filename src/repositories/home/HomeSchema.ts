import { SchemaDefinition, SchemaOptions } from "mongoose";

import BaseSchema from "../BaseSchema";


export default class HomeSchema extends BaseSchema {
   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
      const homeDefinition = {
         ...definition,
         name: {
            type: String,
            required: true
         },
         address: {
            type: String,
            required: true
         },
         phones: {
            type:[{
               type: String,
               required: true
            }],
            default: []
         }
      };

      super(homeDefinition, options);
   }
}
