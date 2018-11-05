import BaseDocument from '../BaseDocument';


/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IApplicationDocument extends BaseDocument {
   createdAt: Date;
   createdBy: string
   updatedAt: Date;
   updatedBy: string
}
