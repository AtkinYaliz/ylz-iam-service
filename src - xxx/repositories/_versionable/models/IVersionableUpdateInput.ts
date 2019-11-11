import { IBaseUpdateInput } from "../../models";

export default interface IVersionableUpdateInput extends IBaseUpdateInput {
  originalId: string;
}
