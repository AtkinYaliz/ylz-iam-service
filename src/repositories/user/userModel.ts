// import * as Promise from 'bluebird';
import { model, Model } from 'mongoose';

import IUserDocument from './IUserDocument';
import UserSchema from './UserSchema';


/**
 * User Schema
 */
const userSchema = new UserSchema();

/**
 * Indicies
 */
userSchema.index({ email: 1 }, { unique: true });


/**
 * toObject
 */
userSchema.set('toObject', {
   transform: (doc: any, ret: any, options: any) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
   }
});
userSchema.set('toJSON', {
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
userSchema.pre("save", (next: any) => {
   next();
});


/**
 * Methods
 */
userSchema.method({
});


/**
 * Statics
 */
userSchema.statics = {
};


/**
 * @typedef Home
 */
const userModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'Users');

export default userModel;
