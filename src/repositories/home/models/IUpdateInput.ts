import { baseModels } from "@ylz/data-access";

export default interface ICreateInput extends baseModels.IBaseUpdateInput {
  name: string;
  address: string;
  phones: string[];
}
