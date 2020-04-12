import { NextFunction, Request, Response } from "express";

import { errors } from "@ylz/common";

export function pageNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  return res.locals.isHit ? next() : next(new errors.NotFoundError());
}
