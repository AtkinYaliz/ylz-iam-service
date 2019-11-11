import { IBaseDocument } from "@ylz/data-access/src/repositories/base/IBaseDocument";
import IAuditDocument from "../IAuditDocument";

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IHomeDocument extends IBaseDocument, IAuditDocument {
  name: string;
  address: string;
  phones: string[];
}
