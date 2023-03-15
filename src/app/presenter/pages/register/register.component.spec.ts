import { RegisterStep } from './../../models/pages/register/register-steps.enum';
import { FormBuilder } from '@angular/forms';
import { RegisterComponent } from "./register.component";
import { RegisterUsecase } from '@domain/usecases/user/register_usecase';
import { LoginUsecase } from '@domain/usecases/user/login_usecase';
import { ValidationError } from '@domain/errors/validation_error';
import { ToastServiceInterface } from '@infra/modules/toast/contracts/toast-service.interface';
import { BadRequestError } from '@domain/errors';

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  let formBuilder: FormBuilder;
  let registerUsecase: jasmine.SpyObj<RegisterUsecase>;
  let loginUsecase: jasmine.SpyObj<LoginUsecase>;
  let toastService: jasmine.SpyObj<ToastServiceInterface>;

  beforeEach(async () => {
    formBuilder = new FormBuilder();
    registerUsecase = jasmine.createSpyObj('RegisterUsecase', ['call']);
    loginUsecase = jasmine.createSpyObj('LoginUsecase', ['call']);
    toastService = jasmine.createSpyObj('ToastServiceInterface', ['showWarning', 'showError']);

    component = new RegisterComponent(formBuilder, loginUsecase, registerUsecase, toastService);
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

      it('should set loading as false when finished', async () => {
        component.step = RegisterStep.ADDRESS;
  
        await component.nextStep();
  
        expect(component.isLoading).toBeFalse();
      });

      it('should not call register if it is already loading', async () => {
        component.step = RegisterStep.ADDRESS;
        component.isLoading = true;

        await component.nextStep();
  
        expect(registerUsecase.call).not.toHaveBeenCalled();
      });

      it('should show a warning if has validation errors', async () => {
        const errorMessage = 'validation error message';

        component.step = RegisterStep.ADDRESS;
        registerUsecase.call.and.throwError(new ValidationError(errorMessage));

        await component.nextStep();
  
        expect(toastService.showWarning).toHaveBeenCalledOnceWith(jasmine.objectContaining({ message: errorMessage }));
      });

      
      it('should show a warning if has bad request errors', async () => {
        const errorMessage = 'bad request error message';

        component.step = RegisterStep.ADDRESS;
        registerUsecase.call.and.throwError(new BadRequestError(errorMessage));

        await component.nextStep();
  
        expect(toastService.showWarning).toHaveBeenCalledOnceWith(jasmine.objectContaining({ message: errorMessage }));
      });

      it('should show an error toast if something goes wrong', async () => {
        const errorMessage = 'bad request error message';

        component.step = RegisterStep.ADDRESS;
        registerUsecase.call.and.throwError(new Error(errorMessage));

        await component.nextStep();
  
        expect(toastService.showError).toHaveBeenCalledOnceWith(jasmine.objectContaining({ message: errorMessage }));
      });

      it('should login after registering', async () => {
        component.step = RegisterStep.ADDRESS;
  
        await component.nextStep();
  
        expect(loginUsecase.call).toHaveBeenCalledTimes(1);
        expect(registerUsecase.call).toHaveBeenCalledBefore(loginUsecase.call);
      });
    });
  });
});
