import { LoginParams, RegisterParams } from "@domain/contracts/repositories";
import { LoginDto } from "@infra/models/auth/dto/login_dto";
import { UserDto } from "@infra/models/user/dto/user_dto";

export abstract class UserDatasourceInterface {
  abstract login(params: LoginParams): Promise<LoginDto>;
  abstract register(params: RegisterParams): Promise<UserDto>;
}
