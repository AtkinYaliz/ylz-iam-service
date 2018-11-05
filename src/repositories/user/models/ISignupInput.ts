import { IBaseCreateInput } from '../../models';


export default interface ISignupInput extends IBaseCreateInput {
   email: string;
   password: string;
   applicationId: string;
}
