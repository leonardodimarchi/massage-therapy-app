import { UserDatasourceInterface } from './../../contracts/datasources/user_datasource.interface';
import { LoginPayload } from 'src/app/domain/contracts/payloads/user/login_payload';
import { UserRepositoryInterface } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { UserEntity } from 'src/app/domain/entities/user/user_entity';

export class UserRepository implements UserRepositoryInterface {

  constructor(
    private readonly datasource: UserDatasourceInterface,
  ) {}

  async login(params: LoginPayload): Promise<UserEntity> {
    return await this.datasource.login(params);
  }
}
