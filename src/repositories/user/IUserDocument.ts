import IVersionableDocument from "../versionable/IVersionableDocument";
import IAuditDocument from "../IAuditDocument";

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
