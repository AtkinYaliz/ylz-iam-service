import { IVersionableCreateInput } from "@ylz/data-access/src/repositories/versionable/models";

export interface ISignupInput extends IVersionableCreateInput {
  applicationId: string;
  email: string;
  password: string;
}
