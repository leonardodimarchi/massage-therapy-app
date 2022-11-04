import { LogoutUsecase } from '@domain/usecases/user/logout_usecase';
import { mockedUserEntity } from '@mocks/user/entities/user_entity_mock';
import { UserServiceInterface } from '@domain/contracts/services';
import { HomeComponent } from './home.component';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let userService: jasmine.SpyObj<UserServiceInterface>;
  let logoutUsecase: jasmine.SpyObj<LogoutUsecase>;
  let routerService: jasmine.SpyObj<RouterServiceInterface>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserServiceInterface', ['subscribeLoggedUserForChanges']);
    logoutUsecase = jasmine.createSpyObj('LogoutUsecase', ['call']);
    routerService = jasmine.createSpyObj('RouterServiceInterface', ['navigate'])

    component = new HomeComponent(userService, routerService, logoutUsecase);
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

  describe('Logout', () => {
    it('should call logout usecase', async () => {
      await component.logout();

      expect(logoutUsecase.call).toHaveBeenCalledTimes(1);
    });

    it('should redirect to the login page', async () => {
      await component.logout();

      expect(logoutUsecase.call).toHaveBeenCalledBefore(routerService.navigate);
      expect(routerService.navigate).toHaveBeenCalledOnceWith('login');
    });
  });
});
