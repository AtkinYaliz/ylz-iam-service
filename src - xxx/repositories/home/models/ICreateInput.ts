import { IBaseCreateInput } from '../../models';


export default interface ICreateInput extends IBaseCreateInput {
   name: string;
   address: string;
   phones: string[];
}
