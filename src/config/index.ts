import dotenv = require("dotenv");
import IConfig from './IConfig';


if (process.env.NODE_ENV === "test") {
   dotenv.config({ path: ".env.test" });
} else {
   dotenv.config();
}

//@ts-ignore
export default <IConfig> {
   apiPrefix: process.env.apiPrefix,
   corsOrigin: process.env.corsOrigin,
   mongoUrl: process.env.mongoUrl,
   nodeEnv: process.env.nodeEnv,
   port: process.env.port,
   secret: process.env.secret,
   swaggerUrl: process.env.swaggerUrl,
   swaggerDefinition: process.env.swaggerDefinition
};


// docker run -d --name ylz-identity-manager --network ylz -p 10000:9000 -e "PORT=9000" graphql-api-server
