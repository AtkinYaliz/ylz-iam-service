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
		applicationId: validApplicationId,
      email: validEmail,
      firstName: validFirstName,
      lastName: validLastName
	},
	userWithEmptyApplicationId: {
		email: validEmail,
		password: validPassword
	},
	userWithNonExistingApplicationId: {
		applicationId: '5bec577920bc54f417801a03',
		email: validEmail,
      firstName: validFirstName,
      lastName: validLastName,
      password: validPassword
	},
	validUser: {
		applicationId: validApplicationId,
		email: validEmail,
      firstName: validFirstName,
      lastName: validLastName,
		password: validPassword
   },
   validChangePassword: {
		applicationId: validApplicationId,
      email: validEmail,
      newPassword: validNewPassword,
		password: validPassword
   }
}
