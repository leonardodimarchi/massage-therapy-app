import { mockedUserEntity } from '@mocks/user/entities/user_entity_mock';
import { UserServiceInterface } from '@domain/contracts/services';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let userService: jasmine.SpyObj<UserServiceInterface>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserServiceInterface', ['subscribeLoggedUserForChanges']);

    component = new HomeComponent(userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Retrieve current user', () => {
    it('should subscribe for the logged user', () => {
      expect(userService.subscribeLoggedUserForChanges).toHaveBeenCalledTimes(1);
    });

    describe('userListener', () => {
      const user = mockedUserEntity;

      it('should set the current user', () => {
        (component as any).userListener(user);

        expect(component.currentUser).toEqual(user);
      });

      it('should set the current user as null if that is the case', () => {
        component.currentUser = user;

        (component as any).userListener(null);

        expect(component.currentUser).toBeNull();
      });
    })
  });
});
