// import * as Promise from 'bluebird';
import { model, Model } from "mongoose";

import { HomeSchema } from "./HomeSchema";
import { IHomeDocument } from "./IHomeDocument";

/**
 * Home Schema
 */
const homeSchema = new HomeSchema(
  {
    _id: String
  },
  {
    collection: "Homes",
    versionKey: false
  }
);

/**
 * Indicies
 */
homeSchema.index({ name: 1 }, { unique: true });

/**
 * toObject
 */
homeSchema.set("toObject", {
  transform: (doc: any, ret: any, options: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});
homeSchema.set("toJSON", {
  transform: (doc: any, ret: any, options: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

/**
 * Add your
 * - pre-save hook
 * - validation
 * - virtual
 */
homeSchema.pre("save", function(next: any) {
  next();
});

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
