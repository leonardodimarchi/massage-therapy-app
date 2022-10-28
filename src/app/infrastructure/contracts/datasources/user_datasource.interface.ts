import { LoginParams } from "@domain/contracts/repositories";
import { LoginEntity } from "@domain/entities/auth/login_entity";

export interface UserDatasourceInterface {
  login(params: LoginParams): Promise<LoginEntity>;
}
