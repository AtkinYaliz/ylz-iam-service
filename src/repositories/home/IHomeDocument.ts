import BaseDocument from '../BaseDocument';


/**
 * This is used for the whole entity that represents the collection in DB.
 */
export default interface IHomeDocument extends BaseDocument {
   name: string;
   address: string;
   phones: string[];
}
