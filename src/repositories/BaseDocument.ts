import { Document } from 'mongoose';


export default interface BaseDocument extends Document {
  id: string;
}
