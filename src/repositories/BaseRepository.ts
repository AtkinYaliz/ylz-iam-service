import { Model, Document } from 'mongoose';
import { DocumentQuery } from 'mongoose';

import { Nullable } from "../libs/Nullable";
import { generateObjectId, clone } from "../libs/utilities";
import { IBaseListInput, IBaseGetInput, IBaseCreateInput, IBaseUpdateInput, IBaseDeleteInput }  from './models';


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
      return this.getById(input.id);
   }

   public async create(input: IBaseCreateInput): Promise<D> {
      return this.getByIdAndUpdate(String(generateObjectId()), input);
   }

   public async update(input: IBaseUpdateInput): Promise<D> {
      return this.getByIdAndUpdate(input.id, input);
   }

   public async delete(input: IBaseDeleteInput): Promise<any> {
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
   private getByIdAndUpdate(id: string, update: any, options: { upsert: boolean, new: boolean } = { upsert: true, new: true }): DocumentQuery<Nullable<D>, D> {
      return this.model.findOneAndUpdate({ _id: id }, update, options);
   }
}
