import * as supertest from 'supertest';
import * as dotenv from 'dotenv';

import Server from '../../../src/Server';
import { StatusCodes } from '../../../src/libs/constants';
import * as Database from '../../../src/services/Database';
import userModel from '../../../src/repositories/user/userModel';
import applicationModel from '../../../src/repositories/application/applicationModel';
import mockUsers, {validApplicationId, validApplicationName} from './mockUsers';


dotenv.config({ path: './.env.test' });
//@ts-ignore
const envVars: IConfig = process.env;
let request = null,
   userId = '',
   token = '';


beforeAll((done) => {
   jest.setTimeout(1000);

   // @ts-ignore
   Database.open(envVars.MONGO_URL)
      .then(async () => {
         await userModel.remove({ });
         await applicationModel.remove({ });
         await applicationModel.create({ _id: validApplicationId, name: validApplicationName });
         request = supertest(Server.getInstance(envVars).application);
         done();
      });
});

describe("UserController", () => {

   it("should return 422 w/ empty user for /signup", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.emptyUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(6);
            expect(res.body.data[0].msg).toBe('Email should be at least 5 chars long!');
            expect(res.body.data[1].msg).toBe('Not a valid email!');
            expect(res.body.data[2].msg).toBe('Password should be at least 6 chars long!');
            expect(res.body.data[3].msg).toBe('First name is required!');
            expect(res.body.data[4].msg).toBe('Last name is required!');
            expect(res.body.data[5].msg).toBe('Wrong format!');
            done();
         });
   });

   it("should return 422 w/ empty password for /signup", (done) => {
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

   it("should return 400 w/ non-existing application id for /signup", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.userWithNonExistingApplicationId)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.BAD_REQUEST);
            expect(res.body.message).toEqual('The application does not exist or you don\'t have permission!');
            done();
         });
   });

   it("should return 201 w/ valid user for /signup", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.validUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body.data).not.toBeNull();
            expect(res.body.data.token).not.toBeUndefined();

            token = res.body.data.token;

            done();
         });
   });

   it("should return 422 w/ duplicate email for /signup", (done) => {
      request
         .post(`/api/users/signup`)
         .send(mockUsers.validUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.message).toEqual('The email is in use!');
            done();
         });
   });

   it("should return 422 w/ empty user for /signin", (done) => {
      request
         .post(`/api/users/signin`)
         .send(mockUsers.emptyUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(4);
            expect(res.body.data[0].msg).toBe('Email should be at least 5 chars long!');
            expect(res.body.data[1].msg).toBe('Not a valid email!');
            expect(res.body.data[2].msg).toBe('Password should be at least 6 chars long!');
            expect(res.body.data[3].msg).toBe('Wrong format!');
            done();
         });
   });

   it("should return 200 w/ valid username password for /signin", (done) => {
      request
         .post(`/api/users/signin`)
         .send(mockUsers.validUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.data).not.toBeNull();
            expect(res.body.data.token).not.toBeUndefined();

            token = res.body.data.token;

            done();
         });
   });

   it("should return 422 w/ empty user for /change-password", (done) => {
      request
         .post(`/api/users/change-password`)
         .send(mockUsers.emptyUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(5);
            expect(res.body.data[0].msg).toBe('Email should be at least 5 chars long!');
            expect(res.body.data[1].msg).toBe('Not a valid email!');
            expect(res.body.data[2].msg).toBe('Password should be at least 6 chars long!');
            expect(res.body.data[3].msg).toBe('New password should be at least 6 chars long!');
            expect(res.body.data[4].msg).toBe('Wrong format!');
            done();
         });
   });

   it("should return 422 w/ empty user for /change-password", (done) => {
      request
         .post(`/api/users/change-password`)
         .send(mockUsers.emptyUser)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.UNPROCESSABLE);
            expect(res.body.data.length).toEqual(5);
            expect(res.body.data[0].msg).toBe('Email should be at least 5 chars long!');
            expect(res.body.data[1].msg).toBe('Not a valid email!');
            expect(res.body.data[2].msg).toBe('Password should be at least 6 chars long!');
            expect(res.body.data[3].msg).toBe('New password should be at least 6 chars long!');
            expect(res.body.data[4].msg).toBe('Wrong format!');
            done();
         });
   });

   it("should return 200 w/ valid user for /change-password", (done) => {
      console.log( token );

      request
         .post(`/api/users/change-password`)
         .set('Authorization', token)
         .send(mockUsers.validChangePassword)
         .end((err, res) => {
            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body.data).not.toBeNull();
            expect(res.body.data.token).not.toBeUndefined();
            done();
         });
   });
});
