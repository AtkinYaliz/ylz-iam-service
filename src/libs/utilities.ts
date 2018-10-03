import * as mongoose from 'mongoose';


export const generateObjectId = () =>
  mongoose.Types.ObjectId();

export const isValidObjectId = (id: any) =>
  mongoose.Types.ObjectId.isValid(id);
