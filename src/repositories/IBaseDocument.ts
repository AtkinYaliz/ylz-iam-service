import { Document } from "mongoose";

export default interface IBaseDocument extends Document {
  id: string;
}
