import * as mongoose from 'mongoose';


export const generateObjectId = () =>
   mongoose.Types.ObjectId();

export const isValidObjectId = (id: string | number | mongoose.Types.ObjectId) =>
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

/**
  * Returns true if existing entity has the spesified id.
  * @param id 'id' to test.
  * @returns A Function that takes the object to test
  */
export function isSameEntity(id) {
   return function isSameId(entity) {
      return entity.id === id;
   }
}

/**
  * Returns true if existing entity has the spesified id.
  * @param id 'id' to test.
  * @returns A true if the value is null or undefined, false otherwise.
  */
export function isNullOrUndefined(x): boolean {
   return x === null || x === undefined;
}

/**
  * Returns true if an item is the same with the other one.
  * @param o1 Item 1 to test.
  * @returns A Function that takes the second item to test
  */
export function isSame(o1) {
   return function (o2) {
      return o1 === o2;
   }
}

/**
  * Returns a newly created object from the current one.
  * @param obj Object to be cloned.
  * @returns A new object that has same structure as the input.
  */
export function clone(obj) {
   return JSON.parse( JSON.stringify(obj) );
}

/**
  * Returns string representation of the key or value of the item in the enum list.
  * @param enums Enum list.
  * @param enumKeyOrValue Key or Value in the enum list.
  * @returns A new object that has same structure as the input.
  */
export function getEnumKeyOrValue(enums: any, enumKeyOrValue: any): string {
    return enums[enumKeyOrValue];
}
