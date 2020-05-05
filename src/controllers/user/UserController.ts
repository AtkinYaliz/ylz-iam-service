import { debug } from "@ylz/logger";
import { responses } from "@ylz/common";

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

  public async signup({ body }: ISignupInput): Promise<responses.IResponse> {
    debug("UserController - signup:", JSON.stringify(body));

    const { applicationId, email, password } = body;

    const user = await this.userRepository.signup({ applicationId, email, password: hash(password) });

    return new responses.CreatedResponse({ data: { token: generateToken(user.id, applicationId) } });
  }

  public async signin({ body }: ISigninInput): Promise<responses.IResponse> {
    debug("UserController - signin:", JSON.stringify(body));

    const { applicationId, email, password } = body;

    const user = await this.userRepository.getUser({ applicationId, email, password: hash(password) });

    //#region [Validations]
    if (!user) {
      return new responses.UnauthorizedResponse({});
    }
    //#endregion

    return new responses.OkResponse({ data: { token: generateToken(user.id, applicationId) } });
  }

  public async changePassword({ body }: IChangePasswordInput): Promise<responses.IResponse> {
    debug("UserController - changePassword:", JSON.stringify(body));

    const { applicationId, email, password, newPassword } = body;

    const user = await this.userRepository.getUser({ applicationId, email, password: hash(password) });

    //#region [Validations]
    if (!user) {
      return new responses.UnauthorizedResponse({});
    }
    //#endregion
    user.password = hash(newPassword);

    this.userRepository.update(user);

    return new responses.OkResponse({});
  }
}

export default UserController.getInstance();
