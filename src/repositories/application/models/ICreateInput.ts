import { IBaseCreateInput } from '../../models';


export default interface ICreateInput extends IBaseCreateInput {
   id?: string;
  name: string;
}
