import { mockedUserEntity } from './../../../mocks/user/user_entity_mock';
import { UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { LoginUsecase } from "./login_usecase";

describe('LoginUsecase', () => {
  let usecase: LoginUsecase;
  let repository: jasmine.SpyObj<UserRepositoryInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('UserRepositoryInterface', ['login']);
    usecase = new LoginUsecase(repository);
  });

  it('should call login repository to return the logged user', async () => {
    repository.login.and.resolveTo(mockedUserEntity);

    const result = await usecase.call({
      email: 'myemail@email.com',
      password: '123456'
    });

    expect(result).toEqual(mockedUserEntity);
    expect(repository.login).toHaveBeenCalledTimes(1);
  });
});
