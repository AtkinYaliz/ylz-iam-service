import * as express from "express";
import * as appInfo from "pjson";
// import { libs } from "@ylz/common";
import { error } from "@ylz/logger";

import Swagger from "./libs/Swagger";
import { IConfig } from "./config/IConfig";
import userRouter from "./controllers/user/routes";
import homeRouter from "./controllers/home/routes";

export class Router {
  private static instance: Router;
  public router: any;

  private constructor(private config: IConfig) {
    /**
     * @swagger
     * securityDefinitions:
     *  APIKeyHeader:
     *    type: apiKey
     *    in: header
     *    name: Authorization
     */
    this.router = express.Router();

    this.initSwaggerRoute();
    this.initDefaultRoutes();
    this.initControllerRoutes();
  }

  public static getInstance(config: IConfig) {
    if (!Router.instance) {
      Router.instance = new Router(config);
    }

    return Router.instance;
  }

  private initSwaggerRoute() {
    const { apiPrefix, swagger } = this.config;
    const swaggerDefinition = swagger.definition;
    const swaggerSetup = new Swagger();

    // JSON route
    this.router.use(`${swagger.url}.json`, swaggerSetup.getRouter({ swaggerDefinition }));

    // UI route
    const { serve, setup } = swaggerSetup.getUI(apiPrefix + swagger.url);

    this.router.use(swagger.url, serve, setup);
  }
  private initDefaultRoutes() {
    //#region [swagger: /health-check - GET]
    /**
     * @swagger
     * /health-check:
     *   get:
     *     tags:
     *       - General
     *     description: Health Check
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: I am OK
     */
    //#endregion
    this.router.get("/health-check", (req, res) => {
      res.send("I am OK");
    });

    //#region [swagger: /version - GET]
    /**
     * @swagger
     * /version:
     *   get:
     *     tags:
     *       - General
     *     description: Get Version
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Version Response
     *         schema:
     *           type: object
     *           properties:
     *             version:
     *               type: string
     *               description: Version of the API.
     *             name:
     *               type: string
     *               description: Name of the API.
     *             description:
     *               type: string
     *               description: Description of the API.
     */
    //#endregion
    this.router.get("/version", (req, res) => {
      const { version, name, description } = appInfo;

      if (!(typeof version && version)) {
        error("An error occurred while trying to get version: Version not defined");

        res.status(400).send(new Error("Version not defined"));
      }

      res.json({
        version,
        name,
        description
      });
    });
  }
  private initControllerRoutes() {
    // mount email routes at /users
    this.router.use("/homes", homeRouter);

    // mount email routes at /users
    this.router.use("/users", userRouter);
  }
}
