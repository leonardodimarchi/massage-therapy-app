import { LoginParams } from "@domain/contracts/repositories";
import { LoginDto } from "@infra/models/auth/dto/login_dto";

export abstract class UserDatasourceInterface {
  abstract login(params: LoginParams): Promise<LoginDto>;
}
