import { mockedJwtProxy } from './../../../mocks/jwt/jwt_proxy.mock';
import { LoginPayload } from './../../../domain/contracts/payloads/user/login_payload';
import { UserDatasourceInterface } from './../../contracts/datasources/user_datasource.interface';
import { UserRepository } from './user_repository';

describe('UserRepository', () => {
  let datasource: jasmine.SpyObj<UserDatasourceInterface>;
  let repository: UserRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('UserDatasourceInterface', ['login']);
    repository = new UserRepository(datasource);
  });

  it('should call the datasource with the correct params', async () => {
    datasource.login.and.resolveTo(mockedJwtProxy);

    const params: LoginPayload = {
      email: 'mock@email.com',
      password: '123456',
    }

    await repository.login(params);

    expect(datasource.login).toHaveBeenCalledOnceWith(params);
  })
});
