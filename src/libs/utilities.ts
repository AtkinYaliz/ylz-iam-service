import * as mongoose from 'mongoose';


export const generateObjectId = () =>
   mongoose.Types.ObjectId();

export const isValidObjectId = (id: any) =>
   mongoose.Types.ObjectId.isValid(id);

export function getPackageJson(count = 0) {
   let pjson: any;

   try {
      if(count === 0) {
         pjson = require('./package.json');
      } else if(count < 5) {
         pjson = require('../'.repeat(count) + 'package.json');
      } else {
         return null;
      }
   } catch(err) {
      return getPackageJson(++count);
   }

   return pjson;
}
