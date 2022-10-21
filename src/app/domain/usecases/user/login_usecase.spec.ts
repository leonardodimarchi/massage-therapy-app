import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { mockedJwtEntity } from 'src/app/mocks/jwt/jwt_entity_mock';
import { mockedUserEntity } from 'src/app/mocks/user/entities/user_entity_mock';
import { storageKeys } from 'src/environments/storage_keys';
import { LoginEntity } from '../../entities/auth/login_entity';
import { UserValidators } from '../../validators/user/user_validators';
import { LoginParams, UserRepositoryInterface } from './../../contracts/repositories/user_repository.interface';
import { LoginUsecase } from "./login_usecase";

describe('LoginUsecase', () => {
  let usecase: LoginUsecase;
  let repository: jasmine.SpyObj<UserRepositoryInterface>;
  let storageServiceSpy: jasmine.SpyObj<StorageServiceInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('UserRepositoryInterface', ['login']);
    storageServiceSpy = jasmine.createSpyObj('StorageServiceInterface', ['set']);
    usecase = new LoginUsecase(repository, storageServiceSpy);

    repository.login.and.resolveTo(new LoginEntity({
      jwt: mockedJwtEntity,
      loggedUser: mockedUserEntity,
    }));
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

    expect(storageServiceSpy.set).toHaveBeenCalledWith(storageKeys.userToken, mockedJwtEntity.accessToken);
    expect(storageServiceSpy.set).toHaveBeenCalledWith(storageKeys.loggedUser, mockedUserEntity);
    expect(storageServiceSpy.set).toHaveBeenCalledTimes(2);
  });

  describe('Validators', () => {
    describe('Email', () => {
      it('should call the email validator', async () => {
        const validatorSpy = spyOn(UserValidators, 'isValidEmail');
        validatorSpy.and.returnValue(true);
        
        const payload: LoginParams = {
          email: 'myemail@email.com',
          password: '123456'
        };
  
        await usecase.call(payload);
  
        expect(validatorSpy).toHaveBeenCalledOnceWith(payload.email);
      });
  
      it('should throw and error if the email is invalid', async () => {
        spyOn(UserValidators, 'isValidEmail').and.returnValue(false);
        
        const payload: LoginParams = {
          email: 'myemail@email.com',
          password: '123456'
        };
  
        await expectAsync(usecase.call(payload)).toBeRejectedWithError();
      });
    });

    describe('Password', () => {
      it('should call the password validator', async () => {
        const validatorSpy = spyOn(UserValidators, 'isValidPassword');
        validatorSpy.and.returnValue(true);
        
        const payload: LoginParams = {
          email: 'myemail@email.com',
          password: '123456'
        };
  
        await usecase.call(payload);
  
        expect(validatorSpy).toHaveBeenCalledOnceWith(payload.password);
      });
  
      it('should throw and error if the password is invalid', async () => {
        spyOn(UserValidators, 'isValidPassword').and.returnValue(false);
        
        const payload: LoginParams = {
          email: 'myemail@email.com',
          password: '123456'
        };
  
        await expectAsync(usecase.call(payload)).toBeRejectedWithError();
      });
    });
  });
});
