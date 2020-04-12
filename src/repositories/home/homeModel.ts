// import * as Promise from 'bluebird';
import { model, Model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

import { HomeSchema } from "./HomeSchema";
import { IHomeDocument } from "./IHomeDocument";

/**
 * Home Schema
 */
const homeSchema = new HomeSchema({
  collection: "Homes",
  versionKey: false
});

/**
 * Indicies
 */
homeSchema.index({ name: 1 }, { unique: true });

/**
 * Add your
 * - pre-save hook
 * - validation
 * - virtual
 */
homeSchema.pre("save", function (next: any) {
  next();
});

/**
 * Plugins
 */
homeSchema.plugin(mongooseLeanVirtuals);

/**
 * Methods
 */
homeSchema.methods = {};

/**
 * Statics
 */
homeSchema.statics = {};

/**
 * @typedef Home
 */
const homeModel: Model<IHomeDocument> = model<IHomeDocument>("Home", homeSchema);

export default homeModel;
