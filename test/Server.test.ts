import * as request from 'supertest';
import * as dotenv from 'dotenv';

import IConfig from '../src/config/IConfig';
import Server from '../src/Server';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;


const app = Server.getInstance(envVars).application;

describe("Server", () => {
  it("should return 404", (done) => {
    request(app)
      .get("/reset1")
      .expect(404, done);
  });

  it("should return 404", () => {
    request(app)
      .get("/reset1")
      // .expect(403);
      .end((err, res) => {
         expect(res.status).toBe(404);
      });
  });

  it("should return 404", (done) => {
    request(app)
      .get("/reset2")
      .end((err, res) => {
         expect(res.status).toBe(404);
         done();
      });
  });

  it("should return 404", () => {
    request(app)
      .get("/reset3")
      .then(res => {
         expect(res.status).toBe(404);
      });
  });

  it("should return {version: x.y.z} for /api/version", (done) => {
    request(app)
      .get("/api/version")
      .end((err, res) => {
         expect(res.body).toHaveProperty('version');
         done();
      });
  });
});
