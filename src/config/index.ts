import dotenv = require("dotenv");
import IConfig from './IConfig';


if (process.env.NODE_ENV === "test") {
   dotenv.config({ path: ".env.test" });
} else {
   dotenv.config();
}

// @ts-ignore
export default {
   API_PREFIX: process.env.API_PREFIX,
   CORS_ORIGIN: process.env.CORS_ORIGIN,
   MONGO_URL: process.env.MONGO_URL,
   NODE_ENV: process.env.NODE_ENV,
   PORT: process.env.PORT,
   SECRET: process.env.SECRET,
   SWAGGER_URL: process.env.SWAGGER_URL,
   SWAGGER_DEFINITION: process.env.SWAGGER_DEFINITION
} as IConfig;


// docker run -d --name ylz-identity-manager --network ylz -p 10000:9000 -e "PORT=9000" graphql-api-server
