import { RegisterStep } from './../../models/pages/register/register-steps.enum';
import { FormBuilder } from '@angular/forms';
import { RegisterComponent } from "./register.component";
import { RegisterUsecase } from '@domain/usecases/user/register_usecase';
import { LoginUsecase } from '@domain/usecases/user/login_usecase';

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  let formBuilder: FormBuilder;
  let registerUsecase: RegisterUsecase;
  let loginUsecase: LoginUsecase;

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    registerUsecase = jasmine.createSpyObj('RegisterUsecase', ['call']);
    loginUsecase = jasmine.createSpyObj('LoginUsecase', ['call'])

    component = new RegisterComponent(formBuilder, loginUsecase, registerUsecase);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize at BASIC_INFORMATION step', () => {
    expect(component.step).toBe(RegisterStep.BASIC_INFORMATION);
  });

  describe('nextStep', () => {
    describe('BASIC_INFORMATION', () => {
      it('should go to PERSONAL_INFORMATION step', () => {
        component.nextStep();
  
        expect(component.step).toBe(RegisterStep.PERSONAL_INFORMATION);
      });
    });

    describe('PERSONAL_INFORMATION', () => {
      it('should go to ADDRESS step', () => {
        component.step = RegisterStep.PERSONAL_INFORMATION;
  
        component.nextStep();
  
        expect(component.step).toBe(RegisterStep.ADDRESS);
      });
    });

    describe('ADDRESS', () => {
      it('should call register when finishing step', async () => {
        component.step = RegisterStep.ADDRESS;
  
        await component.nextStep();
  
        expect(registerUsecase.call).toHaveBeenCalledTimes(1);
      });

      it('should set loading as true when calling register', async () => {
        component.step = RegisterStep.ADDRESS;
  
        component.nextStep();
  
        expect(component.isLoading).toBeTrue();
      });
    });
  });
});
