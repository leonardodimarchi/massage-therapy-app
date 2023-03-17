import { FormBuilder } from '@angular/forms';
import { LoginUsecase } from "@domain/usecases/user/login_usecase";
import { LoginComponent } from "@presenter/pages/login/login.component";
import { ToastServiceInterface } from "@infra/modules/toast/contracts/toast-service.interface";
import { RouterServiceInterface } from "@infra/modules/router/contracts/router-service.interface";

describe('LoginComponent', () => {
  let component: LoginComponent;

  let loginUsecase: jasmine.SpyObj<LoginUsecase>;
  let toastService: jasmine.SpyObj<ToastServiceInterface>;
  let routerService: jasmine.SpyObj<RouterServiceInterface>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    loginUsecase = jasmine.createSpyObj('LoginUsecase', ['call']);
    toastService = jasmine.createSpyObj('ToastServiceInterface', ['showError']);
    routerService = jasmine.createSpyObj('RouterServiceInterface', ['navigate']);
    formBuilder = new FormBuilder();

    component = new LoginComponent(loginUsecase, toastService, routerService, formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Login', () => {
    it('should call the login usecase with the correct params', async () => {
      const expectedEmail = 'mocked@email.com';
      const expectedPassword = '123456';
      component.form.controls.email.setValue(expectedEmail);
      component.form.controls.password.setValue(expectedPassword);

      await component.login();

      expect(loginUsecase.call).toHaveBeenCalledOnceWith({
        email: expectedEmail,
        password: expectedPassword,
      })
    });

    it('should show an error toast when receiving an error from the usecase', async () => {
      const message = 'mocked error';
      loginUsecase.call.and.throwError(message);

      await component.login();

      expect(toastService.showError).toHaveBeenCalledOnceWith({
        message,
      })
    });

    it('should set loading state as true when calling the usecase', () => {
      component.login();

      expect(component.isLoading).toBeTrue();
    });

    it('should set loading state as false when finishing the usecase call', async () => {
      await component.login();

      expect(component.isLoading).toBeFalse();
    });

    it('should not call usecase if it\'s already loading', async () => {
      component.isLoading = true;

      await component.login();

      expect(loginUsecase.call).not.toHaveBeenCalled();
    });

    it('should navigate after logging in', async () => {
      await component.login();

      expect(routerService.navigate).toHaveBeenCalledOnceWith('home');
    });
  });
});
