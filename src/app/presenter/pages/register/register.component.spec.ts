import { RegisterStep } from './../../models/pages/register/register-steps.enum';
import { FormBuilder } from '@angular/forms';
import { RegisterComponent } from "./register.component";

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  let formBuilder: FormBuilder;

  beforeEach(async () => {
    formBuilder = new FormBuilder();

    component = new RegisterComponent(formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize at BASIC_INFORMATION step', () => {
    expect(component.step).toBe(RegisterStep.BASIC_INFORMATION);
  });

  describe('nextStep', () => {
    it('should go from BASIC_INFORMATION to PERSONAL_INFORMATION', () => {
      component.nextStep();

      expect(component.step).toBe(RegisterStep.PERSONAL_INFORMATION);
    });

    it('should go from PERSONAL_INFORMATION to ADDRESS', () => {
      component.step = RegisterStep.PERSONAL_INFORMATION;

      component.nextStep();

      expect(component.step).toBe(RegisterStep.ADDRESS);
    });
  });
});
