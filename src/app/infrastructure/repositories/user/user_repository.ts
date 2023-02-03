import { UserRepositoryInterface, LoginParams, RegisterParams } from "@domain/contracts/repositories";
import { LoginEntity } from "@domain/entities/auth/login_entity";
import { UserEntity } from "@domain/entities/user/user_entity";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { LoginMapper } from "@infra/models/auth/mappers/login_mapper";
import { UserMapper } from "@infra/models/user/mappers/user_mapper";
import { HttpErrorHandler } from "@infra/repositories/shared/errors/http_error_handler";

export class UserRepository implements UserRepositoryInterface {

  constructor(
    private readonly datasource: UserDatasourceInterface,
  ) { }

  async login(params: LoginParams): Promise<LoginEntity> {
    try {
      const result = await this.datasource.login(params);

      return new LoginMapper(result).toEntity();
    } catch (error: unknown) {
      HttpErrorHandler.handle(error);
    }
  }

  async register(params: RegisterParams): Promise<UserEntity> {
    try {
      const result = await this.datasource.register(params);

      return new UserMapper(result).toEntity();
    } catch (error: unknown) {
      HttpErrorHandler.handle(error);
    }
  }
}
