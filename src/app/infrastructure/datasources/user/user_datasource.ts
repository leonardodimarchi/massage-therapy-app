import { LoginParams, RegisterParams } from "@domain/contracts/repositories";
import { HttpServiceInterface } from "@domain/contracts/services";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { LoginDto } from "@infra/models/auth/dto/login_dto";
import { ApiEndpoints } from "@infra/datasources/endpoints";
import { UserDto } from "@infra/models/user/dto/user_dto";

export class UserDatasource implements UserDatasourceInterface {

    constructor(
        private readonly httpService: HttpServiceInterface,
    ) { }

    async login(params: LoginParams): Promise<LoginDto> {
      return await this.httpService.post<LoginDto>(ApiEndpoints.Auth.login(), params);
    }

    async register(params: RegisterParams): Promise<UserDto> {
      throw new Error('Method not implemented yet.');
    }
}
