import BaseDocument from '../BaseDocument';
import IAuditDocument from '../IAuditDocument';

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IUserDocument extends BaseDocument, IAuditDocument {
   email: string;
   password: string;
   applicationId: string;
}
