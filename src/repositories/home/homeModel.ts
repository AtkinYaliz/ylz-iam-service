// import * as Promise from 'bluebird';
import { model, Model } from 'mongoose';

import IHomeDocument from './IHomeDocument';
import HomeSchema from './HomeSchema';


/**
 * Home Schema
 */
const homeSchema = new HomeSchema();

/**
 * Indicies
 */
homeSchema.index({ name: 1 }, { unique: true });


/**
 * toObject
 */
homeSchema.set('toObject', {
   transform: (doc: any, ret: any, options: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});
homeSchema.set('toJSON', {
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
homeSchema.methods = {
};


/**
 * Statics
 */
homeSchema.statics = {
};


/**
 * @typedef Home
 */
const homeModel: Model<IHomeDocument> = model<IHomeDocument>('Home', homeSchema, 'Homes');

export default homeModel;
