import { LoginParams } from "@domain/contracts/repositories";
import { LoginEntity } from "@domain/entities/auth/login_entity";

export abstract class UserDatasourceInterface {
  abstract login(params: LoginParams): Promise<LoginEntity>;
}
