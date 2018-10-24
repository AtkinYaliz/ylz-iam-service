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
      const { limit, skip } = query;
      const data = await this._homeRepository.list({ limit, skip });

      return new OKResponse({ data });
   }

   public async get({ params }: IGetInput) {
      const id = params.id;
      const home = await this._homeRepository.get({ id });

      return home
         ? new OKResponse({ data: home })
         : new BadRequestResponse({ message: 'Could not find the home.' });
   }

   public async create({ body }: ICreateInput) {
      const home = await this._homeRepository.create(body);

      return new CreatedResponse({ data: home });
   }

   public async update({ params, body }: IUpdateInput) {
      const update = {
         ... body,
         id: params.id
      };

      await this._homeRepository.update(update);

      return new NoContentResponse();
   }

   public async delete({ params }: IDeleteInput) {
      const id = params.id;

      await this._homeRepository.delete({ id });

      return new NoContentResponse();
   }
}

export default HomeController.getInstance();
