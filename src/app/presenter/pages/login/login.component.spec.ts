import { ToastService } from './../../../infrastructure/modules/toast/services/toast.service';
import { LoginUsecase } from 'src/app/domain/usecases/user/login_usecase';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;

  let loginUsecase: jasmine.SpyObj<LoginUsecase>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(async () => {
    loginUsecase = jasmine.createSpyObj('LoginUsecase', ['call']);
    toastService = jasmine.createSpyObj('ToastService', ['showError']);

    component = new LoginComponent(loginUsecase, toastService);
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
  });
});
