import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
import { UserEntity } from "src/app/domain/entities/user/user_entity";

export interface UserDatasourceInterface {
  login(params: LoginPayload): Promise<UserEntity>;
}
