import logger from 'ylz-logger';

import { ISignupInput, ILoginInput, IChangePasswordInput } from './models';
import UserRepository from '../../repositories/user/UserRepository';
import { CreatedResponse, OKResponse, UnauthorizedResponse } from '../../models/responses';
import { generateToken } from '../../services/Password';


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

      const user = await this._userRepository.signup(body);
      const token = { token: generateToken(user) };

      return new CreatedResponse({ data: token });
   }

   public async login({ body }: ILoginInput) {
      logger.debug('UserController - login', JSON.stringify(body));

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
