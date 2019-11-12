import { NextFunction, Request, Response } from "express";
import { error } from "@ylz/logger";
import { libs } from "@ylz/common";

import { BadRequestError, DuplicateKeyError, PageNotFoundError, ValidationError } from "@ylz/common/dist/src/models/errors";
import {
  BadRequestResponse,
  HttpResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
  UnprocessableResponse
} from "@ylz/common/dist/src/models/responses";

export function errorHandler(nodeEnv: string) {
  return function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (nodeEnv !== libs.constants.EnvVar.TEST) {
      error(err);
    }

    let response: HttpResponse;

    switch (err.type) {
      case PageNotFoundError.name:
        response = new NotFoundResponse();
        break;
      case ValidationError.name:
        response = new UnprocessableResponse({
          data: err.data.map(e => ({
            location: "",
            param: e.path,
            value: e.value,
            msg: e.message
          })),
          message: err.message
        });
        break;
      case DuplicateKeyError.name:
        response = new UnprocessableResponse({
          message: err.message
        });
        break;
      case BadRequestError.name:
        response = new BadRequestResponse({
          message: err.message
        });
        break;
      case InternalServerErrorResponse.name:
      default:
        if (err.name === "AuthenticationError") {
          response = new UnauthorizedResponse({});
        } else {
          response = new InternalServerErrorResponse({});
        }
        break;
    }

    res.status(response.code).json(response);
  };
}
