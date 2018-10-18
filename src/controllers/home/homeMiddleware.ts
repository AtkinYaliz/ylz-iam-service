import { SystemResponse } from "../../models/responses";


export default function homeMiddleware(controller: Function) {

   return async (req: any, res: any, next: any) => {
      const { headers, params, query, body } = req;
      const response: SystemResponse = await controller({ headers, params, query, body });

      return res
         .status(response.statusCode)
         .json(response);
   }
}
