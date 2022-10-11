import { LoginUsecase } from 'src/app/domain/usecases/user/login_usecase';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let loginUsecase: jasmine.SpyObj<LoginUsecase>;

  beforeEach(async () => {
    loginUsecase = jasmine.createSpyObj('LoginUsecase', ['call']);
    component = new LoginComponent(loginUsecase);
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
  });
});
