import { RequestLocations } from "../../libs/constants";
import { isValidObjectId, isValidEmail } from "../../libs/utilities";

const validations = Object.freeze({
  id: {
    in: [RequestLocations.params],
    custom: {
      options: id => isValidObjectId(id),
      errorMessage: "Wrong format!"
    }
  },
  firstName: {
    in: [RequestLocations.body],
    isLength: {
      options: { min: 1 },
      errorMessage: "First name is required!"
    }
  },
  lastName: {
    in: [RequestLocations.body],
    isLength: {
      options: { min: 1 },
      errorMessage: "Last name is required!"
    }
  },
  email: {
    in: [RequestLocations.body],
    isLength: {
      options: { min: 5 },
      errorMessage: "Email should be at least 5 chars long!"
    },
    custom: {
      options: email => isValidEmail(email),
      errorMessage: "Not a valid email!"
    }
  },
  password: {
    in: [RequestLocations.body],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password should be at least 6 chars long!"
    }
  },
  newPassword: {
    in: [RequestLocations.body],
    isLength: {
      options: { min: 6 },
      errorMessage: "New password should be at least 6 chars long!"
    }
  },
  applicationId: {
    in: [RequestLocations.body],
    custom: {
      options: (id, { req }) => isValidObjectId(req.body.applicationId),
      errorMessage: "Wrong format!"
    }
  }
});

/*
 * The location of the field, can be one or more of [body, cookies, headers, params, query].
 * If omitted, all request locations will be checked
 * */
export default Object.freeze({
  // POST /api/signup
  signup: {
    email: validations.email,
    password: validations.password,
    firstName: validations.firstName,
    lastName: validations.lastName,
    applicationId: validations.applicationId
  },
  signin: {
    email: validations.email,
    password: validations.password,
    applicationId: validations.applicationId
  },
  changePassword: {
    email: validations.email,
    password: validations.password,
    newPassword: validations.newPassword,
    applicationId: validations.applicationId
  }
});
