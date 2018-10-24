import { Model, Document, DocumentQuery } from 'mongoose';
import logger from 'ylz-logger';

import { Nullable } from "../libs/Nullable";
import { generateObjectId, clone } from "../libs/utilities";
import { IBaseListInput, IBaseGetInput, IBaseCreateInput, IBaseUpdateInput, IBaseDeleteInput }  from './models';
import { DuplicateKeyError } from '../models/errors';


export default abstract class BaseRepository<D extends Document, M extends Model<D>> {

   protected model: M;

   constructor(model) {
      this.model = model;
   }

   public async list(input: IBaseListInput): Promise<D[]> {
      const options = clone(input);

      delete options.limit;
      delete options.skip;

      return this.getAll(options)
         .sort({ createdAt: -1 })
         .skip(input.skip)
         .limit(input.limit);
   }

   public async get(input: IBaseGetInput): Promise<Nullable<D>> {
      logger.info('BaseRepository - get');

      return this.getById(input.id);
   }

   public async create(input: IBaseCreateInput): Promise<D> {
      try {
         logger.info('BaseRepository - create');

         const id = generateObjectId();

         return await this.model.create({
            ...input,
            _id: id
         });
      } catch (err) {
         logger.error(err);

         if(err.code === 11000) {
            throw new DuplicateKeyError();
         } else {
            throw err;
         }
      }


   }

   public async update(input: IBaseUpdateInput): Promise<D> {
      return this.model.findOneAndUpdate({ _id: input.id }, input, { new: true });
   }

   public async delete(input: IBaseDeleteInput): Promise<D> {
      return this.model.findByIdAndDelete(input.id);
   }


   protected getAll(query: any): DocumentQuery<D[], D> {
      return this.model.find(query);
   }
   protected getById(id: string): DocumentQuery<D | null, D> {
      return this.model.findById(id);
   }
   protected getByIds(ids: string[]): DocumentQuery<D[], D> {
      return this.getAll({ _id: {$in: ids} });
   }
}
