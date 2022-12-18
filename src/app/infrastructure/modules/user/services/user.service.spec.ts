import { UserEntity } from '@domain/entities/user/user_entity';
import { JwtEntity, JwtEntityProps } from './../../../../domain/entities/auth/jwt_entity';
import { StorageServiceInterface } from "@domain/contracts/services";
import { storageKeys } from "@env/storage_keys";
import { mockedJwtEntity } from "@mocks/jwt/jwt_entity_mock";
import { mockedUserEntity, mockedUserEntityProps } from "@mocks/user/entities/user_entity_mock";
import { UserService } from "@infra/modules/user/services/user.service";

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

  describe('JWT', () => {
    describe('setJwt', () => {
      it('should set the jwt token', async () => {
        await service.setJwt(mockedJwtEntity);

        expect(storageServiceSpy.set).toHaveBeenCalledOnceWith(storageKeys.userToken, mockedJwtEntity);
      });
    });

    describe('getJwt', () => {
      it('should get the jwt token', async () => {
        const accessToken = 'mockedToken';
        storageServiceSpy.get.and.resolveTo({
          props: {
            accessToken,
          } as JwtEntityProps,
        });

        const result = await service.getJwt();

        expect(storageServiceSpy.get).toHaveBeenCalledOnceWith(storageKeys.userToken);

        expect(result?.accessToken).toEqual(accessToken);
        expect(result).toBeInstanceOf(JwtEntity);
      });
    });
  });

  describe('isLogged', () => {
    it('should get the user from storage and return true if it exists', async () => {
      storageServiceSpy.get.and.resolveTo({
        props: mockedUserEntityProps,
      });

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
      storageServiceSpy.get.and.resolveTo({
        props: mockedUserEntityProps
      });

      await service.setUpLoggedUser();

      expect((service as any).loggedUserSubject.getValue()).toEqual(mockedUserEntity);
      expect((service as any).loggedUserSubject.getValue()).toBeInstanceOf(UserEntity);
    });
  });
});
