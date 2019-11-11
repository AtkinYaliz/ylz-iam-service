import { IBaseUpdateInput } from '../../models';


export default interface ICreateInput extends IBaseUpdateInput {
   name: string;
   address: string;
   phones: string[];
}
