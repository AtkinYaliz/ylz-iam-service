// import * as Promise from 'bluebird';
import { model, Model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

import { ApplicationSchema } from "./ApplicationSchema";
import { IApplicationDocument } from "./IApplicationDocument";

/**
 * Application Schema
 */
const applicationSchema = new ApplicationSchema({
  collection: "Applications",
  versionKey: false
});

/**
 * Indicies
 */
applicationSchema.index({ name: 1 }, { unique: true });

/**
 * Add your
 * - pre-save hook
 * - validation
 * - virtual
 */
applicationSchema.pre("save", function (next: any) {
  next();
});

/**
 * Plugins
 */
applicationSchema.plugin(mongooseLeanVirtuals);

/**
 * Methods
 */
applicationSchema.methods = {};

/**
 * Statics
 */
applicationSchema.statics = {};

/**
 * @typedef Home
 */
const applicationModel: Model<IApplicationDocument> = model<IApplicationDocument>("Application", applicationSchema);

export default applicationModel;
