// import * as Promise from 'bluebird';
import { model, Model } from 'mongoose';

import IApplicationDocument from './IApplicationDocument';
import ApplicationSchema from './ApplicationSchema';


/**
 * Application Schema
 */
const applicationSchema = new ApplicationSchema();

/**
 * Indicies
 */
applicationSchema.index({ name: 1 }, { unique: true });


/**
 * toObject
 */
applicationSchema.set('toObject', {
   transform: (doc: any, ret: any, options: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});
applicationSchema.set('toJSON', {
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
applicationSchema.pre("save", function(next: any) {
   next();
});


/**
 * Methods
 */
applicationSchema.methods = {
};


/**
 * Statics
 */
applicationSchema.statics = {
};


/**
 * @typedef Home
 */
const applicationModel: Model<IApplicationDocument> = model<IApplicationDocument>('Application', applicationSchema, 'Applications');

export default applicationModel;
