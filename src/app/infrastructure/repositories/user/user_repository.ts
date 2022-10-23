import { HttpErrorHandler } from '../shared/errors/http_error_handler';
import { UserDatasourceInterface } from './../../contracts/datasources/user_datasource.interface';
import { LoginParams, UserRepositoryInterface } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { LoginEntity } from 'src/app/domain/entities/auth/login_entity';

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
