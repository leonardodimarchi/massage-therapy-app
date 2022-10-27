import { LoginParams } from "@domain/contracts/repositories";
import { LoginEntity } from "@domain/entities/auth/login_entity";
import { UserDatasourceInterface } from "@infra/contracts/datasources";
import { mockedJwtEntity } from "@mocks/jwt/jwt_entity_mock";
import { mockedUserEntity } from "@mocks/user/entities/user_entity_mock";
import { UserRepository } from "@infra/repositories/user/user_repository";

describe('UserRepository', () => {
  let datasource: jasmine.SpyObj<UserDatasourceInterface>;
  let repository: UserRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('UserDatasourceInterface', ['login']);
    repository = new UserRepository(datasource);
  });

  it('should call the datasource with the correct params', async () => {
    datasource.login.and.resolveTo(new LoginEntity({
      jwt: mockedJwtEntity,
      loggedUser: mockedUserEntity,
    }));

    const params: LoginParams = {
      email: 'mock@email.com',
      password: '123456',
    }

    await repository.login(params);

    expect(datasource.login).toHaveBeenCalledOnceWith(params);
  })
});
