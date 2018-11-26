
export default interface IChangePasswordInput {
   body: {
      email: string;
      password: string;
      newPassword: string;
      applicationId: string;
   };
}
