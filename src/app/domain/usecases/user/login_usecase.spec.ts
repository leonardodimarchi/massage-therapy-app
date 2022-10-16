import { StorageServiceInterface } from 'src/app/infrastructure/modules/storage/models/storage-service-interface';
import { mockedJwtProxy } from 'src/app/mocks/jwt/jwt_proxy.mock';
import { storageKeys } from 'src/environments/storage_keys';
import { UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { LoginUsecase } from "./login_usecase";

describe('LoginUsecase', () => {
  let usecase: LoginUsecase;
  let repository: jasmine.SpyObj<UserRepositoryInterface>;
  let storageServiceSpy: jasmine.SpyObj<StorageServiceInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('UserRepositoryInterface', ['login']);
    storageServiceSpy = jasmine.createSpyObj('StorageServiceInterface', ['set']);
    usecase = new LoginUsecase(repository, storageServiceSpy);
  });

  it('should call login repository', async () => {
    repository.login.and.resolveTo(mockedJwtProxy);

    await usecase.call({
      email: 'myemail@email.com',
      password: '123456'
    });

    expect(repository.login).toHaveBeenCalledTimes(1);
  });

  it('should set the jwt on the storage', async () => {
    repository.login.and.resolveTo(mockedJwtProxy);

    await usecase.call({
      email: 'myemail@email.com',
      password: '123456'
    });

    expect(storageServiceSpy.set).toHaveBeenCalledOnceWith(storageKeys.userToken, mockedJwtProxy.access_token);
  });
});
