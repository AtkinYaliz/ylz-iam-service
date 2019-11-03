import { IVersionableCreateInput } from "../../versionable/models";

export default interface ISignupInput extends IVersionableCreateInput {
  email: string;
  password: string;
  applicationId: string;
}
