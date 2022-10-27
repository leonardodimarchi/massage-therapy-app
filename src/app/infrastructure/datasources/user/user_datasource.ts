import { LoginParams } from "@domain/contracts/repositories";
import { HttpServiceInterface } from "@domain/contracts/services";
import { LoginEntity } from "@domain/entities/auth/login_entity";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { LoginDto } from "@infra/models/auth/dto/login_dto";
import { LoginMapper } from "@infra/models/auth/mappers/login_mapper";
import { ApiEndpoints } from "@infra/datasources/endpoints";

export class UserDatasource implements UserDatasourceInterface {

    constructor(
        private readonly httpService: HttpServiceInterface,
    ) { }

    async login(params: LoginParams): Promise<LoginEntity> {
        const result = await this.httpService.post<LoginDto>(ApiEndpoints.Auth.login(), params);

        return new LoginMapper(result).toEntity();
    }
}
