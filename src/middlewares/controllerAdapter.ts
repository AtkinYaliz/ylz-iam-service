import { HttpResponse } from "../models/responses";


export default function controllerAdapter(controller: any = null, functionName: string = '') {

   return async (req: any, res: any, next: any) => {
      try {
         const { headers, params, query, body } = req;

         const response: HttpResponse = await controller[functionName]({ headers, params, query, body });

         return res
            .status(response.statusCode)
            .json(response);
      } catch(err) {
         next( err );
      }
   }
}
