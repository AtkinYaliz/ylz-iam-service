import * as request from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;

const app = Server.getInstance(envVars).application;


describe("UserController", () => {
  it("should return 404", (done) => {
    request(app)
      .get("/api/users")
      .expect(200, done);
  });
});
