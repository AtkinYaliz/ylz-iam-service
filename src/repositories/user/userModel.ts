// import * as Promise from 'bluebird';
import { model, Model } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';

import IUserDocument from './IUserDocument';
import UserSchema from './UserSchema';


/**
 * User Schema
 */
const userSchema = new UserSchema();

/**
 * Indicies
 */
userSchema.index({ email: 1, applicationId: 1 }, { unique: true });


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
userSchema.pre("save", function(next: any) {
   if (this.isModified('password')) {
      // @ts-ignore
      this.password = this.hashPassword(this.password);
   }
   next();
});


/**
 * Methods
 */
userSchema.methods = {
   hashPassword(password) {
      return hashSync(password);
   },
   authenticateUser(password) {
      return compareSync(password, this.password);
   }
};


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
