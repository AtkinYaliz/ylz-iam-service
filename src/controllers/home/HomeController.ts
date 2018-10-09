import { Request, Response, NextFunction } from 'express';
// import { isSameEntity } from '../../libs/utilities';
import SuccessResponse from '../../libs/responses/SuccessResponse';
import ErrorResponse from '../../libs/responses/ErrorResponse';
import { StatusCodes } from '../../libs/constants';

const homes = [
   { id: '5bbbd1578958866e997326ef', name: 'home', address: '14 burleigh road' },
   { id: '5bbbd1658958866e997326f0', name: 'work', address: '10 triaton street' },
   { id: '5bbbd16f8958866e997326f1', name: 'hsbc', address: '107 bluefin building' },
   { id: '5bbbd1788958866e997326f2', name: 'vokalink', address: '83 rickmansworth high street' }
];

class HomeController {
   public static getInstance() {
      if (!HomeController.instance) {
         HomeController.instance = new HomeController();
      }

      return HomeController.instance;
   }
   private static instance: HomeController;

   // private _userRepository: UserRepository;

   /* tslint:disable: no-null-keyword */
   private constructor(/*templateRepository: Nullable<UserRepository> = null*/) {
    // this._userRepository = userRepository ? userRepository : new UserRepository();
   }

   public list(req: Request, res: Response, next: NextFunction) {
      // return HomeController.getInstance()._homeRepository.list({ limit, skip });
      res.json( new SuccessResponse({ data: homes }) );
   }

   /**
   * Get home.
   * @property {string} id - Number of messages to be skipped.
   * @returns {IHome}
   */
   public get(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      const home = homes.find(x=> x.id === id);

      const response = home
         ? new SuccessResponse({ data: home })
         : new ErrorResponse({ statusCode: StatusCodes.BAD_REQUEST, message: 'Could not find.' });

      res.status(response.statusCode).json( response );
   }
}

export default HomeController.getInstance();
