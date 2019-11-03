import { Document, Query, Model } from "mongoose";
import logger from "@ylz/logger";

import { Nullable } from "../libs/customTypes";
import { clone, generateObjectId, lean, leanObject } from "../libs/utilities";
import { IBaseCreateInput, IBaseDeleteInput, IBaseGetInput, IBaseGetOneInput, IBaseListInput, IBaseUpdateInput } from "./models";

export default abstract class BaseRepository<D extends Document> {
  protected model: Model<D>;

  constructor(model: Model<D>) {
    this.model = model;
  }

  public async get(input: IBaseGetInput): Promise<Nullable<D>> {
    logger.debug("BaseRepository - get:", JSON.stringify(input));

    return this.getById(input.id);
  }
  public getOne(conditions: any, populate?: any | null): Promise<Nullable<D>> {
    logger.debug("BaseRepository - getOne:", JSON.stringify(conditions), JSON.stringify(populate));
    return populate ? lean(this.model.findOne(conditions).populate(populate)) : lean(this.model.findOne(conditions));
  }

  public async list(input: IBaseListInput): Promise<D[]> {
    logger.debug("BaseRepository - list:", JSON.stringify(input));

    const conditions = clone(input);

    delete conditions.limit;
    delete conditions.skip;

    const options = {
      skip: input.skip || 0,
      limit: input.limit || 0,
      sort: { createdAt: -1 }
    };

    return this.getAll(conditions, null, options);
  }

  public async create(input: IBaseCreateInput): Promise<D> {
    logger.debug("BaseRepository - create:", JSON.stringify(input));

    const id = input.id || String(generateObjectId());

    return await this.model.create({
      _id: id,
      ...input
    });
  }

  public async update(input: IBaseUpdateInput): Promise<Nullable<D>> {
    logger.debug("BaseRepository - update:", JSON.stringify(input));

    return this.model.findOneAndUpdate({ _id: input.id }, input, { new: true });
  }

  public async delete(input: IBaseDeleteInput): Promise<Nullable<D>> {
    logger.debug("BaseRepository - delete:", JSON.stringify(input));

    return this.model.findByIdAndRemove(input.id);
  }

  /**
   * Protected methods for internal use
   */
  protected getById(id: string): Promise<D | null> {
    return lean(this.model.findById(id));
  }
  protected getByIds(ids: string[]): Promise<D[]> {
    return this.getAll({ _id: { $in: ids } });
  }
  protected async getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    logger.debug("BaseRepository - getAll:", JSON.stringify(conditions), JSON.stringify(projection), JSON.stringify(options));

    return populate
      ? (await this.model
          .find(conditions, projection, options)
          .populate(populate)
          .lean()).map(leanObject)
      : (await this.model.find(conditions, projection, options).lean()).map(leanObject);
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(input: IBaseCreateInput[], options?: any | null): Promise<D[]> {
    logger.debug("BaseRepository - insertMany:", JSON.stringify(input), JSON.stringify(options));
    const docsToInsert: any = input.map(item => {
      const id = item.id || generateObjectId();
      return { ...item, _id: id };
    });
    return this.model.insertMany(docsToInsert, options);
  }

  public count(conditions: any = {}): Query<number> {
    logger.debug("BaseRepository - count:", JSON.stringify(conditions));
    return this.model.count(conditions);
  }
}
