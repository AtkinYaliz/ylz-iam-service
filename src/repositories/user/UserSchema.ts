import { SchemaDefinition, SchemaOptions } from "mongoose";
import * as validator from 'validator';

import BaseSchema from "../BaseSchema";


export default class UserSchema extends BaseSchema {
   constructor(definition?: SchemaDefinition, options?: SchemaOptions) {
      const userDefinition = {
         ...definition,
         email: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Email is required!'],
            minlength: [5, 'Email needs to be at least 5 chars!'],
            validate: {
                validator(email) {
                    return validator.isEmail(email);
                },
                message: '{VALUE} is not a valid email!',
            }
         },
         password: {
            type: String,
            trim: true,
            required: [true, 'Password is required!'],
            minlength: [6, 'Password needs to be at least 6 chars!'],
            validate: {
                validator(password) {
                    return !!password; // validator.isEmail(password);
                },
                message: '{VALUE} is not a strong password!',
            }
         },
         applicationId: {
            type: String, 
            ref: 'Application',
            required: [true, 'Application ID is required!']
         },
      };

      super(userDefinition, options);
   }
}
