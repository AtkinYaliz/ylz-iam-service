import { IBaseDocument } from "@ylz/data-access";
import { IAuditDocument } from "@ylz/data-access";

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export interface IApplicationDocument extends IBaseDocument, IAuditDocument {
  name: string;
}
