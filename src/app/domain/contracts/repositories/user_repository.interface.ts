import { JwtProxy } from './../proxies/jwt_proxy';
import { LoginPayload } from './../payloads/user/login_payload';

export interface UserRepositoryInterface {
  login(params: LoginPayload): Promise<JwtProxy>;
}
