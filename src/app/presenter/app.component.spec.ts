import { fakeAsync, tick } from "@angular/core/testing";
import { UserServiceInterface } from "../domain/contracts/services/user_service.interface";
import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let userServiceSpy: jasmine.SpyObj<UserServiceInterface>;

  const createComponent = () => {
    return new AppComponent(userServiceSpy);
  }

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserServiceInterface', ['isLogged', 'setUpLoggedUser']);
    userServiceSpy.isLogged.and.resolveTo(true);

    component = createComponent();

    userServiceSpy.isLogged.calls.reset();
  });

  describe('Setup logged user', () => {
    it('should setup logged user if there is a logged user', fakeAsync(() => {
      userServiceSpy.isLogged.and.resolveTo(true);

      createComponent();

      tick();

      expect(userServiceSpy.setUpLoggedUser).toHaveBeenCalledTimes(1);
    }));

    it('should not setup logged user if there is no logged user', fakeAsync(() => {
      userServiceSpy.isLogged.and.resolveTo(false);

      createComponent();

      tick();

      expect(userServiceSpy.setUpLoggedUser).not.toHaveBeenCalled();
    }));
  });
});
