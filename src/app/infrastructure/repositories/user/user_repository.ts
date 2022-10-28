import { UserRepositoryInterface, LoginParams } from "@domain/contracts/repositories";
import { LoginEntity } from "@domain/entities/auth/login_entity";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { HttpErrorHandler } from "@infra/repositories/shared/errors/http_error_handler";

export class UserRepository implements UserRepositoryInterface {

  constructor(
    private readonly datasource: UserDatasourceInterface,
  ) {}

  async login(params: LoginParams): Promise<LoginEntity> {
    try {
      return await this.datasource.login(params);
    } catch (error) {
      HttpErrorHandler.handle(error);
    }
  }
}
