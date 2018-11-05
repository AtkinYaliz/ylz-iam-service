import { SchemaDefinition, SchemaOptions } from "mongoose";

import BaseSchema from "../BaseSchema";


export default class HomeSchema extends BaseSchema {
   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
      const homeDefinition = {
         ...definition,
         name: {
            type: String,
            trim: true,
            required: [true, 'Name is required!'],
            minlength: [2, 'Name needs to be at least 2 chars!']
         },
         address: {
            type: String,
            trim: true,
            required: [true, 'Address is required!'],
            minlength: [2, 'Address needs to be at least 2 chars!'],
            validate: {
                validator(address) {
                    return !!address; // validator.isEmail(address);
                },
                message: '{VALUE} is not a valid address!',
            }
         },
         phones: {
            type:[{
               type: String,
               required: true
            }],
            default: []
         },

         
         createdAt: {
            type: Date,
            required: true,
            default: () => new Date()
         },
         createdBy: {
            type: String,
            required: true,
            default: '-'
         },
         updatedAt: {
            type: Date,
            required: true,
            default: () => new Date()
         },
         updatedBy: {
            type: String,
            required: true,
            default: '-'
         }
      };

      super(homeDefinition, options);
   }
}
