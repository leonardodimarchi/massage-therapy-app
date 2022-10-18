import { StorageServiceInterface } from 'src/app/infrastructure/modules/storage/models/storage-service-interface';
import { mockedJwtProxy } from 'src/app/mocks/jwt/jwt_proxy.mock';
import { storageKeys } from 'src/environments/storage_keys';
import { LoginPayload } from '../../contracts/payloads/user/login_payload';
import { UserValidators } from '../../validators/user/user_validators';
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

    repository.login.and.resolveTo(mockedJwtProxy);
  });

  it('should call login repository', async () => {
    await usecase.call({
      email: 'myemail@email.com',
      password: '123456'
    });

    expect(repository.login).toHaveBeenCalledTimes(1);
  });

  it('should set the jwt on the storage', async () => {
    await usecase.call({
      email: 'myemail@email.com',
      password: '123456'
    });

    expect(storageServiceSpy.set).toHaveBeenCalledOnceWith(storageKeys.userToken, mockedJwtProxy.access_token);
  });

  describe('Validators', () => {
    it('should call the email validator', async () => {
      const validatorSpy = spyOn(UserValidators, 'email');
      validatorSpy.and.returnValue(true);
      
      const payload: LoginPayload = {
        email: 'myemail@email.com',
        password: '123456'
      };

      await usecase.call(payload);

      expect(validatorSpy).toHaveBeenCalledOnceWith(payload.email);
    });

    it('should throw and error if the email is invalid', async () => {
      spyOn(UserValidators, 'email').and.returnValue(false);
      
      const payload: LoginPayload = {
        email: 'myemail@email.com',
        password: '123456'
      };

      await expectAsync(usecase.call(payload)).toBeRejectedWithError();
    });
  });
});
