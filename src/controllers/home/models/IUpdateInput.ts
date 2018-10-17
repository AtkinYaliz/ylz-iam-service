
export default interface IUpdateInput {
   params: {
      id: string;
   },
   body: {
      name: string;
      address: string;
      phones: string[];
   }
}
