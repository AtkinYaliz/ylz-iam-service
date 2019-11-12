import { IVersionableUpdateInput } from "@ylz/data-access/src/repositories/versionable/models/IVersionableUpdateInput";

export interface IUpdateInput extends IVersionableUpdateInput {
  // id: string;
  applicationId: string;
  email: string;
  password: string;
}
