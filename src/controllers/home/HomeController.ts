import { Request, Response, NextFunction } from 'express';
import logger from 'ylz-logger';

import SuccessResponse from '../../libs/responses/SuccessResponse';
import ErrorResponse from '../../libs/responses/ErrorResponse';
import { StatusCodes } from '../../libs/constants';
import { generateObjectId, isSameEntity } from '../../libs/utilities';

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
   private constructor() {  // templateRepository: Nullable<UserRepository> = null) {
      // this._userRepository = userRepository ? userRepository : new UserRepository();
   }

   public list(req: Request, res: Response, next: NextFunction) {
      // return HomeController.getInstance()._homeRepository.list({ limit, skip });
      res.json( new SuccessResponse({ data: homes }) );
   }

   public get(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
      const home = homes.find( isSameEntity(id) );

      const response = home
         ? new SuccessResponse({ data: home })
         : new ErrorResponse({ statusCode: StatusCodes.BAD_REQUEST, message: 'Could not find.' });

      res.status(response.statusCode)
         .json( response );
   }

   public create(req: Request, res: Response, next: NextFunction) {
      const home = {
         ...req.body,
         id: String(generateObjectId())
      }

      homes.push( home );

      const response = new SuccessResponse({ statusCode: StatusCodes.CREATED, data: homes.find(isSameEntity(home.id)) });

      res.status(response.statusCode)
         .json( response );
   }

   public update(req: Request, res: Response, next: NextFunction) {
      let home = homes.find( isSameEntity(req.params.id) );
      home.name = req.body.name;
      home.address = req.body.address;

      const response = new SuccessResponse({ data: homes.find(isSameEntity(home.id)) });

      res.status(response.statusCode)
         .json( response );
   }
}

export default HomeController.getInstance();
