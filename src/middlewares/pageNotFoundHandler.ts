import { NextFunction, Request, Response } from "express";

import { PageNotFoundError } from "@ylz/common/dist/src/models/errors";

export function pageNotFoundHandler(req: Request, res: Response, next: NextFunction) {
  return res.locals.isHit ? next() : next(new PageNotFoundError());
}
