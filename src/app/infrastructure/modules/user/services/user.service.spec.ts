import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { mockedJwtEntity } from 'src/app/mocks/jwt/jwt_entity_mock';
import { mockedUserEntity } from 'src/app/mocks/user/entities/user_entity_mock';
import { storageKeys } from 'src/environments/storage_keys';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let storageServiceSpy: jasmine.SpyObj<StorageServiceInterface>;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageServiceInterface', ['set']);
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
    it('should set the user', async () => {
      await service.setJwt(mockedJwtEntity);

      expect(storageServiceSpy.set).toHaveBeenCalledOnceWith(storageKeys.userToken, mockedJwtEntity);
    });
  });
});
