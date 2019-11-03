import IBaseDocument from "../IBaseDocument";
import IAuditDocument from "../IAuditDocument";

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IApplicationDocument extends IBaseDocument, IAuditDocument {
  name: string;
}
