import IBaseDocument from '../IBaseDocument';
import IAuditDocument from '../IAuditDocument';

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IUserDocument extends IBaseDocument, IAuditDocument {
   email: string;
   password: string;
   applicationId: string;
}
