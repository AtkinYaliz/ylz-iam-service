import { Model } from 'mongoose';

import BaseRepository from '../BaseRepository';
import IHomeDocument from './IHomeDocument'
import homeModel from './homeModel';
import { IListInput, IGetInput, ICreateInput, IUpdateInput, IDeleteInput } from './models'
import { Nullable } from '../../libs/Nullable';


class HomeRepository extends BaseRepository<IHomeDocument, Model<IHomeDocument>> {
   public static getInstance(): HomeRepository {
      if(!HomeRepository.instance) {
         HomeRepository.instance = new HomeRepository();
      }

      return HomeRepository.instance;
   }

   private static instance: HomeRepository;

   private constructor() {
      super(homeModel);
   }


   public async list(input: IListInput): Promise<IHomeDocument[]> {
      return super.list(input);
   }

   public async get(input: IGetInput): Promise<Nullable<IHomeDocument>> {
      return super.get(input);
   }

   public async create(input: ICreateInput): Promise<IHomeDocument> {
      return super.create(input);
   }

   public async update(input: IUpdateInput): Promise<IHomeDocument> {
      return super.update(input);
   }

   public async delete(input: IDeleteInput): Promise<IHomeDocument> {
      return super.delete(input);
   }
}

export default HomeRepository.getInstance();
