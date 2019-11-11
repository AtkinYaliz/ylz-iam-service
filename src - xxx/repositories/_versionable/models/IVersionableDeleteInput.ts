import IBaseDeleteInput from "../../models/IBaseDeleteInput";

export default interface IVersionableDeleteInput extends IBaseDeleteInput {
  originalId: string;
}
