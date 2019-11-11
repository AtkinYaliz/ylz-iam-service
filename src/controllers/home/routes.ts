import { Router } from "express";
import { checkSchema } from "express-validator/check";

import validations from "./validations";
import controllerAdapter from "../../middlewares/controllerAdapter";
import schemaErrorHandler from "../../middlewares/schemaErrorHandler";
import homeControllerInstance from "./HomeController";

const router = Router();

//#region [swagger: /homes - GET]
/**
 * @swagger
 * /homes:
 *   get:
 *     tags:
 *       - Home
 *     description: Returns all Home names
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Home
 *         schema:
 *           $ref: '#/definitions/Home'
 */
//#endregion
router.route("/").get(
  // auth,
  checkSchema(validations.list as any),
  schemaErrorHandler(),
  controllerAdapter(homeControllerInstance, "list")
);

//#region [swagger: /homes/:id - GET]
/**
 * @swagger
 * /homes/:id:
 *   get:
 *     tags:
 *       - Home
 *     description: Returns a Home
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Home id
 *         in: query
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *     responses:
 *       200:
 *         description: A Home
 *         schema:
 *           $ref: '#/definitions/Home'
 */
//#endregion
router.route("/:id").get(
  // auth,
  checkSchema(validations.get as any),
  schemaErrorHandler(),
  controllerAdapter(homeControllerInstance, "get")
);

//#region [swagger: /homes - POST]
/**
 * @swagger
 * /homes:
 *   post:
 *     tags:
 *       - Home
 *     description: Creates a new Home
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Home name
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *       - address: address
 *         description: Home address
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Home'
 */
//#endregion
router.route("/").post(
  // auth,
  checkSchema(validations.create as any),
  schemaErrorHandler(),
  controllerAdapter(homeControllerInstance, "create")
);

//#region [swagger: /homes/:id - PUT]
/**
 * @swagger
 * /homes/:id:
 *   put:
 *     tags:
 *       - Home
 *     description: Updates a Home
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Home id
 *         in: query
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *       - name: name
 *         description: Home name
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *       - address: address
 *         description: Home address
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Home'
 */
//#endregion
router.route("/:id").put(
  // auth,
  checkSchema(validations.update as any),
  schemaErrorHandler(),
  controllerAdapter(homeControllerInstance, "update")
);

//#region [swagger: /homes/:id - DELETE]
/**
 * @swagger
 * /homes/:id:
 *   delete:
 *     tags:
 *       - Home
 *     description: Deletes a Home
 *     produces:
 *       - application/json
 *     parameters:
 *       - id: id
 *         description: Home id
 *         in: query
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Home'
 *     responses:
 *       200:
 *         description: A Home
 *         schema:
 *           $ref: '#/definitions/Home'
 */
//#endregion
router.route("/:id").delete(
  // auth,
  checkSchema(validations.delete as any),
  schemaErrorHandler(),
  controllerAdapter(homeControllerInstance, "delete")
);

export default router;
