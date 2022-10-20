import { UserDatasourceInterface } from './../../contracts/datasources/user_datasource.interface';
import { LoginParams, UserRepositoryInterface } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { LoginEntity } from 'src/app/domain/entities/auth/login_entity';

export class UserRepository implements UserRepositoryInterface {

  constructor(
    private readonly datasource: UserDatasourceInterface,
  ) {}

  async login(params: LoginParams): Promise<LoginEntity> {
    return await this.datasource.login(params);
  }
}
