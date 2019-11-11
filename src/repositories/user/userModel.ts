import { Model, model } from "mongoose";

import { IUserDocument } from "./IUserDocument";
import { UserSchema } from "./UserSchema";

/**
 * User Schema
 */
const userSchema = new UserSchema(
  {
    _id: String
  },
  {
    collection: "Users",
    versionKey: false
  }
);

/**
 * Indicies
 */
userSchema.index({ email: 1, applicationId: 1 }, { unique: true });

/**
 * toObject
 */
userSchema.set("toObject", {
  transform: (doc: any, ret: any, options: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});
userSchema.set("toJSON", {
  transform: (doc: any, ret: any, options: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

/**
 * @typedef Home
 */
const userModel: Model<IUserDocument> = model<IUserDocument>("User", userSchema);

export default userModel;
