import { Model } from 'mongoose';
import logger from 'ylz-logger';

import BaseRepository from '../BaseRepository';
import IHomeDocument from './IHomeDocument'
import homeModel from './homeModel';
import { IListInput, IGetInput, ICreateInput, IUpdateInput, IDeleteInput } from './models'
import { Nullable } from '../../libs/Nullable';


export default class HomeRepository extends BaseRepository<IHomeDocument, Model<IHomeDocument>> {
   constructor() {
      super(homeModel);
   }


   public async list(input: IListInput): Promise<IHomeDocument[]> {
      logger.info('HomeRepository - list');

      return super.list(input);
   }
   public async get(input: IGetInput): Promise<Nullable<IHomeDocument>> {
      logger.info('HomeRepository - get');

      return super.get(input);
   }

   public async create(input: ICreateInput): Promise<IHomeDocument> {
      logger.info('HomeRepository - create');

      return super.create(input);
   }
   public async update(input: IUpdateInput): Promise<IHomeDocument> {
      logger.info('HomeRepository - update');

      return super.update(input);
   }
   public async delete(input: IDeleteInput): Promise<IHomeDocument> {
      logger.info('HomeRepository - delete');

      return super.delete(input);
   }
}
