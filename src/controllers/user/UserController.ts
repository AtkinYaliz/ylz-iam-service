import { Request, Response, NextFunction } from 'express';
// import logger from 'ylz-logger';

// import { ICreate, IUpdate } from "./entities";
// import { Nullable } from '../../libs/Nullable';
// import TemplateRepository from '../../repositories/template/TemplateRepository';


class UserController {
   public static getInstance() {
      if (!UserController.instance) {
         UserController.instance = new UserController();
      }

      return UserController.instance;
   }
   private static instance: UserController;

   /* tslint:disable:variable-name */
   // private _userRepository: UserRepository;

   /* tslint:disable: no-null-keyword */
   private constructor(/*templateRepository: Nullable<UserRepository> = null*/) {
    // this._userRepository = userRepository ? userRepository : new UserRepository();
   }

   public async getAll(req: Request, res: Response, next: NextFunction) {
      res.json([12]);
   }

   // /**
   //  * @description Signup
   //  * @param {string} body.username template body
   //  * @param {string} body.password template name
   //  */
   // public async signup(action: any, audience: any, body: string, name: string,
   //                             shortDesc: string): Promise<Nullable<ICreate>> {
   //   logger.debug('NotificationController - CreateTemplate');
   //
   //   return NotificationController.getInstance()._templateRepository.create({
   //     action, audience, body, name, shortDesc
   //   });
   // }



   // /**
   //  * @description Update Template
   //  * @param {string} body.originalId ID of template
   //  * @param {string} body.body template body
   //  * @param {string} body.name template name
   //  * @param {string} body.shortDesc template short description
   //  * @param {any} action links
   //  * @param {any} audience list of roles
   //  */
   // public async updateTemplate(originalId: string, action: any, audience: any, body: string, name: string,
   //                             shortDesc: string): Promise<Nullable<IUpdate>> {
   //   logger.debug('NotificationController - UpdateTemplate');
   //
   //   return NotificationController.getInstance()._templateRepository.update({
   //     originalId, action, audience, body, name, shortDesc
   //   });
   // }
}

export default UserController.getInstance();
