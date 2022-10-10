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
});
