import * as supertest from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';
import { StatusCodes } from '../../../src/libs/constants';
import * as Database from '../../../src/services/Database';
import homeModel from '../../../src/repositories/home/homeModel';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;
let request = null;
let homeId = '';

beforeAll((done) => {
   jest.setTimeout(1000);

   // @ts-ignore
   Database.open(envVars.mongoUrl)
      .then(async () => {
         await homeModel.remove({ });
         request = supertest(Server.getInstance(envVars).application);
         done();
      });
});

describe("HomeController", () => {
   it("should return 422 for GET /api/homes/xyz", (done) => {
      request
         .get("/api/homes/123")
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data).toEqual( [{"location": "query", "msg": "Wrong format!", "param": "id"}] );
            done();
         });
   });

   it("should return 200 for POST /api/homes", (done) => {
      request
         .post("/api/homes")
         .send({ name:'new name', address: 'wimbledon high street', phones: ['111-222'] })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body.data).not.toBeNull();
            expect(res.body.data).not.toBeUndefined();
            expect(res.body.data.id).not.toBeNull();
            expect(res.body.data.id).not.toBeUndefined();

            homeId = res.body.data.id;

            done();
         });
   });

   it("should return 200 for GET /api/homes/:id", (done) => {
      request
         .get(`/api/homes/${homeId}`)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.data.id).toBe(homeId);
            done();
         });
   });

   it("should return 400 for GET /api/homes/:id", (done) => {
      request
         .get("/api/homes/5bbbe44a8958866e997326f3")
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual('Could not find the home.');
            done();
         });
   });



   it("should return 201 for POST /api/homes", (done) => {
      request
         .post("/api/homes")
         .send({ })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(3);
            expect(res.body.data[0].msg).toBe('Name should be at least 2 chars long!');
            expect(res.body.data[1].msg).toBe('Address should be at least 2 chars long!');
            expect(res.body.data[2].msg).toBe('Phones should be a list of strings!');
            done();
         });
   });

   it("should return 200 for POST /api/homes", (done) => {
      request
         .post("/api/homes")
         .send({ name:'new name', address: 'wimbledon high street', phones: ['111-222'] })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body.data.id).not.toBeNull();
            done();
         });
   });

   it("should return 422 for PUT /api/homes/:id", (done) => {
      request
         .put(`/api/homes/${homeId}`)
         .send({ })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(3);
            expect(res.body.data[0].msg).toBe('Name should be at least 2 chars long!');
            expect(res.body.data[1].msg).toBe('Address should be at least 2 chars long!');
            expect(res.body.data[2].msg).toBe('Phones should be a list of strings!');

            done();
         });
   });

   it("should return 204 for PUT /api/homes/:id", (done) => {
      request
         .put(`/api/homes/${homeId}`)
         .send({ name: 'Updated name 33', address: 'Updated address', phones: ['999-000'] })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.NO_CONTENT);
            expect(res.body).toEqual({});
            done();
         });
   });

   it("should return 422 for DELETE /api/homes/:id", (done) => {
      request
         .delete(`/api/homes/${homeId}`)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.NO_CONTENT);
            done();
         });
   });
});
