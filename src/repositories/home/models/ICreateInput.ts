import { baseModels } from "@ylz/data-access";

export default interface ICreateInput extends baseModels.IBaseCreateInput {
  name: string;
  address: string;
  phones: string[];
}
