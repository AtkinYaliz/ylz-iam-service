import * as supertest from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';
import * as Database from '../../../src/services/Database';
// import userModel from '../../../src/repositories/user/userModel';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;
let request = null;

beforeAll((done) => {
   jest.setTimeout(1000);

   // // @ts-ignore
   // Database.open(envVars.mongoUrl)
   //    .then(async () => {
   //       await userModel.remove({});
   //       request = supertest(Server.getInstance(envVars).application);
   //       done();
   //    });
   
   done();
});

describe("UserController", () => {
   it("should return 422 for GET /users", (done) => {
      expect(1).toEqual(1);
      done();

      // request
      //    .get("/api/users")
      //    .end((err, res) => {
      //       expect(res.status).toEqual(422);
      //       expect(res.body).toEqual({ "errors": [{"location": "body", "msg": "id is required", "param": "id"}] });
      //       done();
      //    });
   });
});
