import { LoginPayload } from "src/app/domain/contracts/payloads/user/login_payload";
import { UserEntity } from "src/app/domain/entities/user/user_entity";
import { routes } from "src/environments/api_routes";
import { UserDatasourceInterface } from "../../contracts/datasources/user_datasource.interface";
import { HttpServiceInterface } from "../../contracts/services/http/http_service.interface";
import { UserModel, UserModelProps } from "../../models/user/user_model";

export class UserDatasource implements UserDatasourceInterface {

    constructor(
        private readonly httpService: HttpServiceInterface,
    ) { }

    async login(params: LoginPayload): Promise<UserEntity> {
        const model: UserModelProps = await this.httpService.post<UserModelProps>(routes.auth.login, params);

        return new UserModel(model).toEntity();
    }
}
