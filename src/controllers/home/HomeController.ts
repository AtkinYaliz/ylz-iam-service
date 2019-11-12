import { debug } from "@ylz/logger";
import { IResponse, BadRequestResponse, CreatedResponse, NoContentResponse, OKResponse } from "@ylz/common/dist/src/models/responses";

import { ICreateInput, IDeleteInput, IGetInput, IListInput, IUpdateInput } from "./models";
import { HomeRepository } from "../../repositories/home/HomeRepository";

class HomeController {
  private static instance: HomeController;
  private homeRepository: HomeRepository;

  private constructor() {
    this.homeRepository = new HomeRepository();
  }

  public static getInstance() {
    if (!HomeController.instance) {
      HomeController.instance = new HomeController();
    }

    return HomeController.instance;
  }

  public async list({ query }: IListInput): Promise<IResponse> {
    debug("HomeController - list:", JSON.stringify(query, null, 2));

    const { limit, skip } = query;
    const data = await this.homeRepository.list({ limit, skip });

    return new OKResponse({ data });
  }

  public async get({ params }: IGetInput): Promise<IResponse> {
    debug("HomeController - get:", JSON.stringify(params));

    const id = params.id;
    const home = await this.homeRepository.get({ id });

    return home ? new OKResponse({ data: home }) : new BadRequestResponse({ message: "Could not find the home." });
  }

  public async create({ body }: ICreateInput): Promise<IResponse> {
    debug("HomeController - create:", JSON.stringify(body));

    const home = await this.homeRepository.create(body);

    return new CreatedResponse({ data: home });
  }

  public async update({ params, body }: IUpdateInput): Promise<IResponse> {
    debug("HomeController - update:", JSON.stringify({ params, body }));

    const update = {
      ...body,
      id: params.id
    };

    await this.homeRepository.update(update);

    return new NoContentResponse();
  }

  public async delete({ params }: IDeleteInput): Promise<IResponse> {
    debug("HomeController - delete:", JSON.stringify(params));

    const id = params.id;

    await this.homeRepository.delete({ id });

    return new NoContentResponse();
  }
}

export default HomeController.getInstance();
