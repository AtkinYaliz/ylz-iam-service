import * as supertest from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';
import { StatusCodes } from '../../../src/libs/constants';
import * as Database from '../../../src/services/Database';
import userModel from '../../../src/repositories/user/userModel';
import applicationModel from '../../../src/repositories/application/applicationModel';
import mockUsers, {validApplicationId} from './mockUsers';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;
let request = null;
let userId = '';


beforeAll((done) => {
   jest.setTimeout(1000);

   // @ts-ignore
   Database.open(envVars.mongoUrl)
      .then(async () => {
         await userModel.remove({ });
         await applicationModel.remove({ });
         await applicationModel.create({ _id: validApplicationId });
         request = supertest(Server.getInstance(envVars).application);
         done();
      });
});

describe("UserController", () => {
   it("should return 422 for empty user", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.emptyUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(4);
            expect(res.body.data[0].msg).toBe('Email should be at least 5 chars long!');
            expect(res.body.data[1].msg).toBe('Not a valid email!');
            expect(res.body.data[2].msg).toBe('Password should be at least 6 chars long!');
            expect(res.body.data[3].msg).toBe('Application ID should be at least 5 chars long!');
            done();
         });
   });

   it("should return 422 for empty password", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.userWithEmptyPassword)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(1);
            expect(res.body.data[0].msg).toBe('Password should be at least 6 chars long!');
            done();
         });
   });

   it("should return 400 for non-existing application id", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.userWithNonExistingApplicationId)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual('The application does not exist or you don\'t have permission!');
            done();
         });
   });

   it("should return 201 for valid user", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.validUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body.data).not.toBeNull();
            expect(res.body.data.id).not.toBeUndefined();

            userId = res.body.data.id;

            done();
         });
   });

   it("should return 422 for duplicate email", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.validUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.message).toEqual('This email is in use!');
            done();
         });
   });
});
