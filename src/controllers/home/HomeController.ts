import { Request, Response, NextFunction } from 'express';

import { SuccessResponse, CreateResponse, NoContentResponse, ErrorResponse } from '../../models/responses';
import { StatusCodes } from '../../libs/constants';
import homeRepositoryInstance from '../../repositories/home/HomeRepository';
import { IListInput, IGetInput, ICreateInput, IUpdateInput, IDeleteInput } from './models';



class HomeController {
   public static getInstance() {
      if (!HomeController.instance) {
         HomeController.instance = new HomeController();
      }

      return HomeController.instance;
   }
   private static instance: HomeController;

   // private _userRepository: UserRepository;
   private constructor() {  // templateRepository: Nullable<UserRepository> = null) {
      // this._homeRepository = userRepository ? userRepository : new UserRepository();
   }


   public async list({ query }: IListInput) {
      const { limit, skip } = query;
      const data = await homeRepositoryInstance.list({ limit, skip });

      return new SuccessResponse({ data });
   }

   public async get({ params }: IGetInput) {
      const id = params.id;
      const home = await homeRepositoryInstance.get({ id });

      return home
         ? new SuccessResponse({ data: home })
         : new ErrorResponse({ statusCode: StatusCodes.BAD_REQUEST, message: 'Could not find.' });
   }

   public async create({ body }: ICreateInput) {
      const home = await homeRepositoryInstance.create(body);

      return new CreateResponse({ data: home });
   }

   public async update({ params, body }: IUpdateInput) {
      const update = {
         ... body,
         id: params.id
      };

      await homeRepositoryInstance.update(update);

      return new NoContentResponse({ });
   }

   public async delete({ params }: IDeleteInput) {
      const id = params.id;

      await homeRepositoryInstance.delete({ id });

      return new NoContentResponse({ });
   }
}

export default HomeController.getInstance();
