import { Model, Document, DocumentQuery } from 'mongoose';
import logger from 'ylz-logger';

import { Nullable } from "../libs/Nullable";
import { generateObjectId, clone } from "../libs/utilities";
import { IBaseListInput, IBaseGetInput, IBaseGetOneInput, IBaseCreateInput, IBaseUpdateInput, IBaseDeleteInput }  from './models';


export default abstract class BaseRepository<D extends Document, M extends Model<D>> {

   protected model: M;

   constructor(model: M) {
      this.model = model;
   }

   /**
    * Public methods for child classes
    */
   public async list(input: IBaseListInput): Promise<D[]> {
      logger.debug('BaseRepository - list', JSON.stringify(input));

      const options = clone(input);

      delete options.limit;
      delete options.skip;

      return this.getAll(options)
         .sort({ createdAt: -1 })
         .skip(input.skip)
         .limit(input.limit);
   }

   public async get(input: IBaseGetInput): Promise<Nullable<D>> {
      logger.debug('BaseRepository - get', JSON.stringify(input));

      return this.getById(input.id);
   }

   public async getOne(input: IBaseGetOneInput): Promise<Nullable<D>> {
      logger.debug('BaseRepository - getOne', JSON.stringify(input));

      return this.model.findOne(input);
   }

   public async create(input: IBaseCreateInput): Promise<D> {
      logger.debug('BaseRepository - create', JSON.stringify(input));

      const id = String(generateObjectId());

      return this.model.create({
         _id: id,
         ...input
      });
   }

   public async update(input: IBaseUpdateInput): Promise<Nullable<D>> {
      logger.debug('BaseRepository - update', JSON.stringify(input));

      return this.model.findOneAndUpdate({ _id: input.id }, input, { new: true });
   }

   public async delete(input: IBaseDeleteInput): Promise<Nullable<D>> {
      logger.debug('BaseRepository - delete', JSON.stringify(input));

      return this.model.findByIdAndDelete(input.id);
   }


   /**
    * Protected methods for internal use
    */
   protected getById(id: string): DocumentQuery<D | null, D> {
      return this.model.findById(id);
   }
   protected getByIds(ids: string[]): DocumentQuery<D[], D> {
      return this.getAll({ _id: {$in: ids} });
   }
   protected getAll(query: any): DocumentQuery<D[], D> {
      return this.model.find(query);
   }
   public async getCount(query: any = {}): Promise<number> {
      return await this.getAll(query).countDocuments();
   }
}
