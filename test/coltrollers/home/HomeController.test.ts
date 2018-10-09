import * as supertest from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';
import { StatusCodes } from '../../../src/libs/constants';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;
let request = null;


beforeAll(() => {
   // jest.setTimeout(700);
   request = supertest(Server.getInstance(envVars).application)
});

describe("HomeController", () => {
   it("should return 422 for GET /homes/xyz", (done) => {
      request
         .get("/api/homes/123")
         .end((err, res) => {
            expect(res.status).toEqual(StatusCodes.UNPROCESSABLE);
            expect(res.body).toEqual({ "errors": [{"location": "query", "msg": "Wrong format", "param": "id"}] });
            done();
         });
   });

   it("should return 422 for GET /homes/id", (done) => {
      request
         .get("/api/homes/5bbbd1658958866e997326f0")
         .end((err, res) => {
            expect(res.status).toEqual(StatusCodes.OK);
            expect(res.body).toHaveProperty('id');
            expect(res.body.id).toBe('5bbbd1658958866e997326f0');
            done();
         });
   });

   it("should return 422 for GET /homes/id", (done) => {
      request
         .get("/api/homes/5bbbe44a8958866e997326f3")
         .end((err, res) => {
            expect(res.status).toEqual(StatusCodes.OK);
            expect(res.body).toBeNull();
            done();
         });
   });
});
