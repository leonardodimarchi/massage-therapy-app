import { LoginParams } from "src/app/domain/contracts/repositories/user_repository.interface";
import { LoginEntity } from "src/app/domain/entities/auth/login_entity";
import { UserDatasourceInterface } from "../../contracts/datasources/user_datasource.interface";
import { HttpServiceInterface } from "../../../domain/contracts/services/http_service.interface";
import { LoginDto } from "../../models/auth/dto/login_dto";
import { LoginMapper } from "../../models/auth/mappers/login_mapper";
import { ApiEndpoints } from "../endpoints";

export class UserDatasource implements UserDatasourceInterface {

    constructor(
        private readonly httpService: HttpServiceInterface,
    ) { }

    async login(params: LoginParams): Promise<LoginEntity> {
        const result = await this.httpService.post<LoginDto>(ApiEndpoints.Auth.login(), params);

        return new LoginMapper(result).toEntity();
    }
}
