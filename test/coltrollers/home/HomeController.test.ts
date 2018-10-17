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
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.errors).toEqual( [{"location": "query", "msg": "Wrong format", "param": "id"}] );
            done();
         });
   });

   it("should return 400 for GET /homes/id", (done) => {
      request
         .get("/api/homes/5bbbe44a8958866e997326f3")
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual('Could not find.');
            done();
         });
   });

   it("should return 422 for GET /homes/id", (done) => {
      request
         .get("/api/homes/5bbbd1658958866e997326f0")
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.data.id).toBe('5bbbd1658958866e997326f0');
            done();
         });
   });

   it("should return 201 for POST /homes", (done) => {
      request
         .post("/api/homes")
         .send({ })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.errors.length).toEqual(3);
            expect(res.body.errors[0].msg).toBe('Name should be at least 2 chars long');
            expect(res.body.errors[1].msg).toBe('Address should be at least 5 chars long');
            expect(res.body.errors[2].msg).toBe('Phones should be a list of strings!');
            done();
         });
   });

   it("should return 200 for POST /homes", (done) => {
      request
         .post("/api/homes")
         .send({ name:'new name', address: 'wimbledon high street', phones: ['111-222'] })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body.errors).toEqual([]);
            expect(res.body.id).not.toBeNull();
            done();
         });
   });

   it("should return 422 for PUT /homes/id", (done) => {
      request
         .put("/api/homes/5bbbd1658958866e997326f0")
         .send({ })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.errors.length).toEqual(3);
            expect(res.body.errors[0].msg).toBe('Name should be at least 2 chars long');
            expect(res.body.errors[1].msg).toBe('Address should be at least 5 chars long');
            expect(res.body.errors[2].msg).toBe('Phones should be a list of strings!');

            done();
         });
   });

   it("should return 422 for PUT /homes/id", (done) => {
      request
         .put("/api/homes/5bbbd1658958866e997326f0")
         .send({ name: 'Updated name', address: 'Updated address', phones: ['999-000'] })
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.errors).toEqual([]);
            expect(res.body.data.name).toBe('Updated name');
            expect(res.body.data.address).toBe('Updated address');
            expect(res.body.data.phones).toEqual(['999-000']);
            done();
         });
   });

   it("should return 422 for DELETE /homes/id", (done) => {
      request
         .delete("/api/homes/5bbbd1658958866e997326f0")
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.NO_CONTENT);
            done();
         });
   });
});
