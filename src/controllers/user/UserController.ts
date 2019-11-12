import { debug } from "@ylz/logger";
import { IResponse, CreatedResponse, OKResponse, UnauthorizedResponse } from "@ylz/common/dist/src/models/responses";

import { UserRepository } from "../../repositories/user/UserRepository";
import { generateToken, hash } from "../../services/encryption";
import { IChangePasswordInput, ISigninInput, ISignupInput } from "./models";
class UserController {
  public static getInstance() {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }
  private static instance: UserController;
  private userRepository: UserRepository;

  private constructor() {
    this.userRepository = new UserRepository();
  }

  public async signup({ body }: ISignupInput): Promise<IResponse> {
    debug("UserController - signup:", JSON.stringify(body));

    const { applicationId, email, password } = body;

    const user = await this.userRepository.signup({ applicationId, email, password: hash(password) });

    return new CreatedResponse({ data: { token: generateToken(user.id, applicationId) } });
  }

  public async signin({ body }: ISigninInput): Promise<IResponse> {
    debug("UserController - signin:", JSON.stringify(body));

    const { applicationId, email, password } = body;

    const user = await this.userRepository.getUser({ applicationId, email, password: hash(password) });

    //#region [Validations]
    if (!user) {
      return new UnauthorizedResponse({});
    }
    //#endregion

    return new OKResponse({ data: { token: generateToken(user.id, applicationId) } });
  }

  public async changePassword({ body }: IChangePasswordInput): Promise<IResponse> {
    debug("UserController - changePassword:", JSON.stringify(body));

    const { applicationId, email, password, newPassword } = body;

    const user = await this.userRepository.getUser({ applicationId, email, password: hash(password) });

    //#region [Validations]
    if (!user) {
      return new UnauthorizedResponse({});
    }
    //#endregion
    user.password = hash(newPassword);

    this.userRepository.update(user);

    return new OKResponse({});
  }
}

export default UserController.getInstance();
