import { IVersionableCreateInput } from "@ylz/data-access/src/repositories/versionable/models";

export interface ISignupInput extends IVersionableCreateInput {
  email: string;
  password: string;
  applicationId: string;
}
