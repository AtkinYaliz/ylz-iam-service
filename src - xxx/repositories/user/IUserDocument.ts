import { IVersionableDocument } from "@ylz/data-access/src/repositories/versionable/IVersionableDocument";
import { IAuditDocument } from "@ylz/data-access/src/repositories/audit/IAuditDocument";

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IUserDocument extends IVersionableDocument, IAuditDocument {
  email: string;
  password: string;
  applicationId: string;
  originalId: string;
  createdAt: Date;
  deletedAt: Date;
}
