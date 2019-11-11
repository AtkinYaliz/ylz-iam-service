import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/check";
import { UnprocessableResponse } from "@ylz/common/src/models/responses";

export default function schemaErrorHandler() {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const response = new UnprocessableResponse({ data: errors.array() });

      return res.status(response.code).json(response);
      // return res.json({}).end();
    }

    next();
  };
}
