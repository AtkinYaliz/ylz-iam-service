import { constants } from "@ylz/common";
import { utilities } from "@ylz/data-access";

const validations = Object.freeze({
  id: {
    in: [constants.HttpRequestLocation.params],
    custom: {
      options: (id) => utilities.isValidObjectId(id),
      errorMessage: "Wrong format!"
    }
  },
  name: {
    in: [constants.HttpRequestLocation.body],
    isLength: {
      options: { min: 1 },
      errorMessage: "Name should be at least 2 chars long!"
    }
  },
  address: {
    in: [constants.HttpRequestLocation.body],
    isLength: {
      options: { min: 2 },
      errorMessage: "Address should be at least 2 chars long!"
    }
  },
  phones: {
    in: [constants.HttpRequestLocation.body],
    custom: {
      options: (phones: any[]) => Array.isArray(phones), // && phones.length > 0 && phones.every(x => isValidObjectId(x)),
      errorMessage: "Phones should be a list of strings!"
    }
  }
});

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
export default Object.freeze({
  list: {
    limit: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: "Wrong format"
    },
    skip: {
      in: [constants.HttpRequestLocation.query],
      isInt: true,
      optional: true,
      toInt: true,
      errorMessage: "Wrong format"
    }
  },
  get: {
    id: validations.id
  },
  create: {
    name: validations.name,
    address: validations.address,
    phones: validations.phones
  },
  update: {
    id: validations.id,
    name: validations.name,
    address: validations.address,
    phones: validations.phones
  },
  delete: {
    id: validations.id
  }
});
