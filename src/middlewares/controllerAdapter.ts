import { error } from "@ylz/logger";
import { HttpResponse } from "@ylz/common/src/models/responses";

export default function controllerAdapter(controller: any = null, functionName: string = "") {
  return async (req: any, res: any, next: any) => {
    try {
      const {
        headers: { authorization },
        params,
        query,
        body
      } = req;
      const { locals } = res;

      if (locals.isHit) {
        return next();
      }

      const response: HttpResponse = await controller[functionName]({ headers: { authorization }, params, query, body, locals });

      res.locals.isHit = true;

      res.status(response.code).json(response);
    } catch (err) {
      error(err);
      next(err);
    }
  };
}
