import logger from 'ylz-logger';

import { ISignupInput } from './models';
import UserRepository from '../../repositories/user/UserRepository';
import { CreatedResponse } from '../../models/responses';


class UserController {
   private _userRepository: UserRepository;

   public static getInstance() {
      if (!UserController.instance) {
         UserController.instance = new UserController();
      }

      return UserController.instance;
   }
   private static instance: UserController;

   private constructor() {
      this._userRepository = new UserRepository();
   }


   public async signup({ body }: ISignupInput) {
      logger.debug('UserController - signup', JSON.stringify(body));

      const home = await this._userRepository.signup(body);

      return new CreatedResponse({ data: home });
   }
}

export default UserController.getInstance();
