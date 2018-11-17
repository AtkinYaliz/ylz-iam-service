const validEmail = 'valid-email@gmail.com';
const validPassword = 'LondonTest';
const validNewPassword = 'LondonTest2';
const validFirstName = 'test-first-name';
const validLastName = 'test-last-name'
export const validApplicationId = '5bec07e620bc54f4178019f2';
export const validApplicationName = 'test-application';


export default {
	emptyUser: {},
	userWithEmptyPassword: {
      email: validEmail,
      firstName: validFirstName,
      lastName: validLastName,
		applicationId: validApplicationId
	},
	userWithEmptyApplicationId: {
		email: validEmail,
		password: validPassword
	},
	userWithNonExistingApplicationId: {
		email: validEmail,
      password: validPassword,
      firstName: validFirstName,
      lastName: validLastName,
		applicationId: '5bec577920bc54f417801a03'
	},
	validUser: {
		email: validEmail,
		password: validPassword,
      firstName: validFirstName,
      lastName: validLastName,
		applicationId: validApplicationId
   },
   validChangePassword: {
      email: validEmail,
		password: validPassword,
      newPassword: validNewPassword,
		applicationId: validApplicationId
   }
}
