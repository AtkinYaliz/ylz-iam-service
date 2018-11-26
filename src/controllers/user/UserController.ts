import logger from 'ylz-logger';

import { CreatedResponse, OKResponse, UnauthorizedResponse } from '../../models/responses';
import UserRepository from '../../repositories/user/UserRepository';
import { generateToken } from '../../services/Password';
import { IChangePasswordInput, ISigninInput, ISignupInput } from './models';


class UserController {

   public static getInstance() {
      if (!UserController.instance) {
         UserController.instance = new UserController();
      }

      return UserController.instance;
   }
   private static instance: UserController;
   private _userRepository: UserRepository;

   private constructor() {
      this._userRepository = new UserRepository();
   }


   public async signup({ body }: ISignupInput) {
      logger.debug('UserController - signup', JSON.stringify(body));

      const user = await this._userRepository.signup(body);
      const token = { token: generateToken(user) };

      return new CreatedResponse({ data: token });
   }

   public async signin({ body }: ISigninInput) {
      logger.debug('UserController - signin', JSON.stringify(body));

      const user = await this._userRepository.getUser(body);
      const token = { token: generateToken(user) };

      return user
         ? new OKResponse({ data: token })
         : new UnauthorizedResponse();
   }

   public async changePassword({ body }: IChangePasswordInput) {
      logger.debug('UserController - changePassword', JSON.stringify(body));

      const user = await this._userRepository.getUser(body);
      const token = { token: generateToken(user) };

      return user
         ? new OKResponse({ data: token })
         : new UnauthorizedResponse();
   }
}

export default UserController.getInstance();
