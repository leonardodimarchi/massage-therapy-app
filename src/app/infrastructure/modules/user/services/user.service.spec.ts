import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { mockedJwtEntity } from 'src/app/mocks/jwt/jwt_entity_mock';
import { mockedUserEntity } from 'src/app/mocks/user/entities/user_entity_mock';
import { storageKeys } from 'src/environments/storage_keys';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let storageServiceSpy: jasmine.SpyObj<StorageServiceInterface>;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageServiceInterface', ['set', 'get']);
    service = new UserService(storageServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLoggedUser', () => {
    it('should set the user', async () => {
      await service.setLoggedUser(mockedUserEntity);

      expect(storageServiceSpy.set).toHaveBeenCalledOnceWith(storageKeys.loggedUser, mockedUserEntity);
      expect((service as any).loggedUserSubject.getValue()).toEqual(mockedUserEntity);
    });
  });

  describe('subscribeLoggedUserForChanges', () => {
    it('should subscribe the listener and return a unsubscribe method', (done) => {
      const { unsubscribe } = service.subscribeLoggedUserForChanges((user) => {
        if (!user)
          return;

        expect(user).toEqual(mockedUserEntity);
        done();
      });
      
      expect(typeof unsubscribe).toBe('function');
      (service as any).loggedUserSubject.next(mockedUserEntity);
    });
  });

  describe('setJwt', () => {
    it('should set the jwt token', async () => {
      await service.setJwt(mockedJwtEntity);

      expect(storageServiceSpy.set).toHaveBeenCalledOnceWith(storageKeys.userToken, mockedJwtEntity);
    });
  });

  describe('isLogged', () => {
    it('should get the user from storage and return true if it exists', async () => {
      storageServiceSpy.get.and.resolveTo(mockedUserEntity);

      const result = await service.isLogged();

      expect(storageServiceSpy.get).toHaveBeenCalledOnceWith(storageKeys.loggedUser);
      expect(result).toBe(true);
    });

    it('should get the user from storage and return false if it does\'t exists', async () => {
      storageServiceSpy.get.and.resolveTo(null);

      const result = await service.isLogged();

      expect(storageServiceSpy.get).toHaveBeenCalledOnceWith(storageKeys.loggedUser);
      expect(result).toBeFalse();
    });
  });

  describe('setUpLoggedUser', () => {
    it('should set the subject if there is an user at the storage', async () => {
      storageServiceSpy.get.and.resolveTo(mockedUserEntity);

      await service.setUpLoggedUser();

      expect((service as any).loggedUserSubject.getValue()).toEqual(mockedUserEntity);
    });
  });
});
