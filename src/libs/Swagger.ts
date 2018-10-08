import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc = require('swagger-jsdoc');


export interface ISwaggerDefinition {
   swaggerDefinition: {
      basePath: string;
      info: {
         description: string;
         title: string;
         version: string;
      };
      securityDefinitions: {
         Bearer: {
            in: string;
            name: string;
            type: string;
         },
      }
   };
}

export default class Swagger {

   public getRouter({ swaggerDefinition }: ISwaggerDefinition) {
      const router = Router();

      router.route('/')
         .get((req, res) => {
            // options for the swagger docs
            const options = {
            // path to the API docs
            apis: ['dist/src/**/*.js'],
            // import swaggerDefinitions
            swaggerDefinition,
         };
         
         // initialize swagger-jsdoc
         const swaggerSpec = swaggerJSDoc(options);
         res.send(swaggerSpec);
      });

      return router;
   }

   public getUI(swaggerUrl: string) {
      const options = {
         swaggerUrl: `${swaggerUrl}.json`,
      };

      return {
         serve: swaggerUi.serve,
         setup: swaggerUi.setup(undefined, options),
      };
   }
}
