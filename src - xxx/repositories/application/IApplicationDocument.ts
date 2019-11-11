import { IBaseDocument } from "@ylz/data-access/src/repositories/base/IBaseDocument";
import { IAuditDocument } from "@ylz/data-access/src/repositories/audit/IAuditDocument";

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export interface IApplicationDocument extends IBaseDocument, IAuditDocument {
  name: string;
}
