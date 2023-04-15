import { fakeAsync, tick } from "@angular/core/testing";
import { UserServiceInterface } from "../domain/contracts/services/user_service.interface";
import { AppComponent } from "./app.component";
import { BackButtonService } from "@infra/modules/back-button/services/back-button.service";

describe('AppComponent', () => {
  let userServiceSpy: jasmine.SpyObj<UserServiceInterface>;
  let backButtonServiceSpy: jasmine.SpyObj<BackButtonService>;

  const createComponent = () => {
    return new AppComponent(userServiceSpy, backButtonServiceSpy);
  }

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserServiceInterface', ['isLogged', 'setUpLoggedUser']);
    backButtonServiceSpy = jasmine.createSpyObj('BackButtonService', ['initialize']);
    userServiceSpy.isLogged.and.resolveTo(true);

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
