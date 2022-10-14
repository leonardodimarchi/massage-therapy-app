import { UserDatasourceInterface } from './../../contracts/datasources/user_datasource.interface';
import { LoginPayload } from 'src/app/domain/contracts/payloads/user/login_payload';
import { UserRepositoryInterface } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { JwtProxy } from 'src/app/domain/contracts/proxies/jwt_proxy';

export class UserRepository implements UserRepositoryInterface {

  constructor(
    private readonly datasource: UserDatasourceInterface,
  ) {}

  async login(params: LoginPayload): Promise<JwtProxy> {
    return await this.datasource.login(params);
  }
}
