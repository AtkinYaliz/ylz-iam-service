import { SchemaDefinition, SchemaOptions } from "mongoose";
import * as validator from 'validator';

import BaseSchema from "../BaseSchema";


export default class ApplicationSchema extends BaseSchema {
   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
      const applicationDefinition = {
         ...definition,
         createdAt: {
            type: Date,
            required: [true, 'createdAt is required!'],
            default: new Date()
         },
         createdBy: {
            type: String,
            required: [true, 'createdBy is required!'],
            default: '-'
         },
         updatedAt: {
            type: Date,
            required: [true, 'updatedAt is required!'],
            default: new Date()
         },
         updatedBy: {
            type: String,
            required: [true, 'updatedBy is required!'],
            default: '-'
         }
      };

      super(applicationDefinition, options);
   }
}
