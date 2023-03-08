import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";
import { FormGroupFrom } from "@presenter/models/common/form-group-from";
import { RegisterForm } from "@presenter/models/pages/register/register-form";
import { RegisterStep, RegisterStepHelper } from "@presenter/models/pages/register/register-steps.enum";
import { FormValidators } from "@presenter/validators/form-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.createForm();
  }

  public form: FormGroupFrom<RegisterForm>;

  public step: RegisterStep = RegisterStep.BASIC_INFORMATION;

  public isLoading: boolean = false;

  public get isAtBasicInformation(): boolean {
    return this.step === RegisterStep.BASIC_INFORMATION;
  }

  public get isAtPersonalInformation(): boolean {
    return this.step === RegisterStep.PERSONAL_INFORMATION;
  }

  public get isAtAddress(): boolean {
    return this.step === RegisterStep.ADDRESS;
  }

  public nextStep(): void {
    this.step = RegisterStepHelper.getNext(this.step);
  }

  private createForm(): FormGroupFrom<RegisterForm> {
    return this.formBuilder.nonNullable.group({
      basicInformation: this.formBuilder.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, FormValidators.name]],
        phone: ['', [Validators.required, FormValidators.phone]],
        password: ['', [Validators.required, FormValidators.password]],
        passwordConfirmation: ['', [Validators.required, FormValidators.password]],
      },{
        validators: FormValidators.mustMatch('password', 'passwordConfirmation'),
      }),
      personalInformation: this.formBuilder.nonNullable.group({
        birthDate: [undefined, [Validators.required, FormValidators.birthDate]],
        diseaseHistory: [''],
        gender: [UserGenderEnum.FEMALE, [Validators.required]],
      }),
      address: this.formBuilder.nonNullable.group({
        postalCode: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        neighborhood: ['', [Validators.required]],
        street: ['', [Validators.required]],
        houseNumber: [0, [Validators.required]],
      })
    });
  }
}
