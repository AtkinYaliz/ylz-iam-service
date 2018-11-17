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
 * Polyfill functions. Needs to be called when app is loaded.
 * const utilities = require("./libs/utilities");
 * Called as: const arr2 = await forEachSync(arr, func);
 */
export async function forEachSync(arr: any[], func: Function) {
  for (const item of arr) {
     await func(item);
  }
}

export function pluck(key: string) {
  return function(obj: any) {
     return obj[key];
  };
}
export function plucks(keys: string[]) {
   return function(obj: any) {
      const res: any = {};
      keys.forEach(k => { res[k] = obj[k] });
      return res;
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
  * Returns true if an item is the same with the other one.
  * @param x First item to test.
  * @returns A Function that takes the second item to test
  */
export function isSame(x) {
   return function (y) {
      return x === y;
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
