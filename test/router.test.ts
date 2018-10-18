import * as supertest from 'supertest';
import * as dotenv from 'dotenv';

import IConfig from '../src/config/IConfig';
import Server from '../src/Server';
import { StatusCodes } from '../src/libs/constants';
import * as Database from '../src/services/Database';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;
const { mongoUrl } = envVars;
let request = null;

/*
 * when we put 'done' parameter it works 'async'
 * there is no 'done' parameter, so we need to return a 'promise'
 */
beforeAll(() => {
   // jest.setTimeout(700);
   return Database.open(mongoUrl)
      .then(() => {
         request = supertest(Server.getInstance(envVars).application)
      });
});
afterAll(() => {
   return Database.close()
      .then(() => { });
});

// beforeAll((done) => {
//    // jest.setTimeout(700);
//    Database.open(mongoUrl)
//       .then(() => {
//          request = supertest(Server.getInstance(envVars).application)
//          done();
//       });
// });
// afterAll((done) => {
//    Database.close()
//       .then(() => {
//          done();
//       });
// });

describe('Router', () => {
   it("should return OK for /api/health-check", (done) => {
      request
         .get("/api/health-check")
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect(res.text).toBe('I am OK');
            done();
         });
   });

   it("should return {version: x.y.z} for /api/version", (done) => {
      request
         .get("/api/version")
         .end((err, res) => {
            expect(res.body).toHaveProperty('version');
            done();
         });
   });

   it('should return 404 for GET /fake-url w/ .end()', (done) => {
      request
         .get('/fake-url')
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.NOT_FOUND);
            done();
         });
   });

   it('should return 404 for GET /fake-url w/ .then()', () => {
      return request
         .get('/fake-url')
         .then(res => {
            expect(res.status).toBe(StatusCodes.NOT_FOUND);
         });
   });
});
