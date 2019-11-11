import { NextFunction, Request, Response } from "express";

import { PageNotFoundError } from "@ylz/common/src/models/errors";

export default (req: Request, res: Response, next: NextFunction) => {
  // next(new PageNotFoundError());
  return res.locals.isHit ? next() : next(new PageNotFoundError());
};
