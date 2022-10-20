import { LoginParams } from "src/app/domain/contracts/repositories/user_repository.interface";
import { LoginEntity } from "src/app/domain/entities/auth/login_entity";

export interface UserDatasourceInterface {
  login(params: LoginParams): Promise<LoginEntity>;
}
