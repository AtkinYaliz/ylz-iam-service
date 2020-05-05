import { error } from "@ylz/logger";
import { responses } from "@ylz/common";

export function controllerAdapter(controller: any = null, functionName: string = "") {
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

      const response: responses.IResponse = await controller[functionName]({ headers: { authorization }, params, query, body, locals });

      res.locals.isHit = true;

      res.status(response.metadata.code).json(response);
    } catch (err) {
      error(err);
      next(err);
    }
  };
}
