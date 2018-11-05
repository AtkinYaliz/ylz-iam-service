import BaseDocument from '../BaseDocument';


/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IUserDocument extends BaseDocument {
   email: string;
   password: string;
   applicationId: string;
}
