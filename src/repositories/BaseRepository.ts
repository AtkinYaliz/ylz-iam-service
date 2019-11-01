import { Document, Query, Model } from "mongoose";
import logger from "@ylz/logger";

import { Nullable } from "../libs/Nullable";
import { clone, generateObjectId, lean } from "../libs/utilities";
import { IBaseCreateInput, IBaseDeleteInput, IBaseGetInput, IBaseGetOneInput, IBaseListInput, IBaseUpdateInput } from "./models";

export default abstract class BaseRepository<D extends Document> {
  protected model: Model<D>;

  constructor(model: Model<D>) {
    this.model = model;
  }

  /**
   * Public methods for child classes
   */
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

  public async get(input: IBaseGetInput): Promise<Nullable<D>> {
    logger.debug("BaseRepository - get:", JSON.stringify(input));

    return this.getById(input.id);
  }

  public async getOne(input: IBaseGetOneInput): Promise<Nullable<D>> {
    logger.debug("BaseRepository - getOne:", JSON.stringify(input));

    return this.model.findOne(input);
  }

  public async create(input: IBaseCreateInput): Promise<D> {
    logger.debug("BaseRepository - create:", JSON.stringify(input));

    const id = String(generateObjectId());

    return this.model.create({
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
  public async getCount(conditions: any = {}): Promise<number> {
    // return await this.getAll(conditions).countDocuments();
    return (await this.getAll(conditions)).length;
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
  protected async getAll(conditions: any, projection?: any | null, options?: any | null): Promise<D[]> {
    // Query<D[]> {
    return (await this.model.find(conditions, projection, options).lean()).map(lean);

    // return this.model
    //    .find(conditions, projection, options)
    //    .lean();
  }
}
