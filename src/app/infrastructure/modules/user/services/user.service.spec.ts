import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { mockedUserEntity } from 'src/app/mocks/user/entities/user_entity_mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let localStorageSpy: jasmine.SpyObj<typeof localStorage>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setLoggedUser', () => {
    it('should set the user', () => {
      service.setLoggedUser(mockedUserEntity)

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
});
