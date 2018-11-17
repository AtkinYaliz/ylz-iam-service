import BaseDocument from '../BaseDocument';
import IAuditDocument from '../IAuditDocument';

/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IHomeDocument extends BaseDocument, IAuditDocument {
   name: string;
   address: string;
   phones: string[];
}
