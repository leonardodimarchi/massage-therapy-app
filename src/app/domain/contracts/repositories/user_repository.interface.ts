import { LoginPayload } from './../payloads/user/login_payload';
import { UserEntity } from "../../entities/user/user_entity";

export interface UserRepositoryInterface {
  login(params: LoginPayload): Promise<UserEntity>;
}
