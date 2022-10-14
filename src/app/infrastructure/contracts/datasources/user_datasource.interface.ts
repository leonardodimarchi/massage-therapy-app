import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
import { JwtProxy } from "src/app/domain/contracts/proxies/jwt_proxy";

export interface UserDatasourceInterface {
  login(params: LoginPayload): Promise<JwtProxy>;
}
