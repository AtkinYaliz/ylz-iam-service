import { Router } from "express";
import { checkSchema } from "express-validator/check";

import authJWT from "../../middlewares/authJWT";
import authLocal from "../../middlewares/authLocal";
import controllerAdapter from "../../middlewares/controllerAdapter";
import schemaErrorHandler from "../../middlewares/schemaErrorHandler";
import userControllerInstance from "./UserController";
import validations from "./validations";

const router = Router();

// prettier-ignore
router
  .route("/signup")
  .post(
    checkSchema(validations.signup as any), 
    schemaErrorHandler(), 
    controllerAdapter(userControllerInstance, "signup")
);

// prettier-ignore
router
  .route("/signin")
  .post(
    checkSchema(validations.signin as any), 
    schemaErrorHandler(), 
    authLocal, 
    controllerAdapter(userControllerInstance, "signin")
);

// prettier-ignore
router
  .route("/change-password")
  .post(
    checkSchema(validations.changePassword as any),
    schemaErrorHandler(),
    authJWT,
    controllerAdapter(userControllerInstance, "changePassword")
  );

export default router;
