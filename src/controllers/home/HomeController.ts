import logger from 'ylz-logger';

import { OKResponse, CreatedResponse, NoContentResponse, BadRequestResponse } from '../../models/responses';
import HomeRepository from '../../repositories/home/HomeRepository';
import { IListInput, IGetInput, ICreateInput, IUpdateInput, IDeleteInput } from './models';


class HomeController {
   private _homeRepository: HomeRepository;

   public static getInstance() {
      if (!HomeController.instance) {
         HomeController.instance = new HomeController();
      }

      return HomeController.instance;
   }
   private static instance: HomeController;

   private constructor() {
      this._homeRepository = new HomeRepository();
   }

   public async list({ query }: IListInput) {
      logger.debug('HomeController - list', JSON.stringify(query, null, 2));

      const { limit, skip } = query;
      const data = await this._homeRepository.list({ limit, skip });

      return new OKResponse({ data });
   }

   public async get({ params }: IGetInput) {
      logger.debug('HomeController - get', JSON.stringify(params));

      const id = params.id;
      const home = await this._homeRepository.get({ id });

      return home
         ? new OKResponse({ data: home })
         : new BadRequestResponse({ message: 'Could not find the home.' });
   }

   public async create({ body }: ICreateInput) {
      logger.debug('HomeController - create', JSON.stringify(body));

      const home = await this._homeRepository.create(body);

      return new CreatedResponse({ data: home });
   }

   public async update({ params, body }: IUpdateInput) {
      logger.debug('HomeController - update', JSON.stringify({ params, body }));

      const update = {
         ... body,
         id: params.id
      };

      await this._homeRepository.update(update);

      return new NoContentResponse();
   }

   public async delete({ params }: IDeleteInput) {
      logger.debug('HomeController - delete', JSON.stringify(params));

      const id = params.id;

      await this._homeRepository.delete({ id });

      return new NoContentResponse();
   }
}

export default HomeController.getInstance();
