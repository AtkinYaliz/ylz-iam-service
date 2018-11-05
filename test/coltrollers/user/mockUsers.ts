const validEmail = 'valid-email@gmail.com';
const validPassword = 'LondonTest';
export const validApplicationId = 'test-application';


export default {
	emptyUser: {},
	userWithEmptyPassword: {
		email: validEmail,
		applicationId: validApplicationId
	},
	userWithEmptyApplicationId: {
		email: validEmail,
		password: validPassword
	},
	userWithNonExistingApplicationId: {
		email: validEmail,
		password: validPassword,
		applicationId: 'non-existing-application'
	},
	validUser: {
		email: validEmail,
		password: validPassword,
		applicationId: validApplicationId
	}
}