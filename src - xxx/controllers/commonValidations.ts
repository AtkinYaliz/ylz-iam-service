import { RequestLocations } from "../libs/constants";
import { isValidObjectId, isValidArrayOfIds, isValidArrayOfStrings } from "../libs/utilities";

export const commonValidations = Object.freeze({
  checkNumber(paramName, requestLocation = RequestLocations.params, isOptional = true) {
    return {
      in: [requestLocation],
      optional: isOptional,
      custom: {
        options: id => {
          const regex = RegExp(/\d/);
          return regex.test(id);
        },
        errorMessage: `${paramName} should be a number!`
      }
    };
  },
  checkObjectId(paramName, requestLocation = RequestLocations.params, isOptional = true) {
    return {
      in: [requestLocation],
      optional: isOptional,
      custom: {
        options: (id: string) => isValidObjectId(id),
        errorMessage: `${paramName} should be an ObjectId!`
      }
    };
  },
  checkObjectIds(paramName, requestLocation = RequestLocations.body, isOptional = true) {
    return {
      in: [requestLocation],
      errorMessage: `${paramName} should be an array of ObjectIds!`,
      optional: isOptional,
      isArray: true,
      custom: {
        options: (ids: string[]) => isValidArrayOfIds(ids),
        errorMessage: `${paramName} Bad Format!`
      }
    };
  },
  checkString(paramName, requestLocation, isOptional = true) {
    return {
      in: [requestLocation],
      errorMessage: `${paramName} should be a string!`,
      optional: isOptional,
      isString: true
    };
  },
  checkStrings(paramName, requestLocation = RequestLocations.body, isOptional = true) {
    return {
      in: [requestLocation],
      errorMessage: `${paramName} should be an Array of strings!`,
      optional: isOptional,
      isArray: true,
      custom: {
        options: (names: string[]) => isValidArrayOfStrings(names),
        errorMessage: `${paramName} should be a string!`
      }
    };
  }
});
