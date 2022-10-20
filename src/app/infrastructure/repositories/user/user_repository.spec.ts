import { LoginParams } from 'src/app/domain/contracts/repositories/user_repository.interface';
import { LoginEntity } from 'src/app/domain/entities/auth/login_entity';
import { mockedJwtEntity } from 'src/app/mocks/jwt/jwt_entity_mock';
import { mockedUserEntity } from 'src/app/mocks/user/entities/user_entity_mock';
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
