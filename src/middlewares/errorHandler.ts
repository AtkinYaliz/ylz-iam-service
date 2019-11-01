import logger from "@ylz/logger";

import { EnvVars } from "../libs/constants";
import { BadRequestError, DuplicateKeyError, PageNotFoundError, ValidationError } from "../models/errors";
import {
  BadRequestResponse,
  HttpResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
  UnprocessableResponse
} from "../models/responses";

export default function errorHandlerMiddleware(nodeEnv: string) {
  return function errorHandler(err: any, req: any, res: any, next: any) {
    if (nodeEnv !== EnvVars.TEST) {
      logger.error(err);
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
          response = new UnauthorizedResponse(); // BadRequestResponse({ message: err.message });
        } else {
          response = new InternalServerErrorResponse({});
        }
        break;
    }

    res.status(response.code).json(response);
  };
}
