import { JwtProxy } from './../../../domain/contracts/proxies/jwt_proxy';
import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
import { routes } from "src/environments/api_routes";
import { UserDatasourceInterface } from "../../contracts/datasources/user_datasource.interface";
import { HttpServiceInterface } from "../../contracts/services/http/http_service.interface";

export class UserDatasource implements UserDatasourceInterface {

    constructor(
        private readonly httpService: HttpServiceInterface,
    ) { }

    async login(params: LoginPayload): Promise<JwtProxy> {
        return await this.httpService.post<JwtProxy>(routes.auth.login, params);
    }
}
