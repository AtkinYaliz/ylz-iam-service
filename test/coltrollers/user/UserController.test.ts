import * as request from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;

const app = Server.getInstance(envVars).application;


describe("UserController", () => {
  it("should return 422 for GET /test", (done) => {
    return request(app)
      .get("/api/users")
      .end((err, res) => {
         expect(res.status).toEqual(422);
         expect(res.body).toEqual({ "errors": [{"location": "body", "msg": "id is required", "param": "id"}] });
         done();
      });
  });
});
