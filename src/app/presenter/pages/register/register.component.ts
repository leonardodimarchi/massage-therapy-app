import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";
import { LoginUsecase } from "@domain/usecases/user/login_usecase";
import { RegisterUsecase } from "@domain/usecases/user/register_usecase";
import { FormGroupFrom } from "@presenter/models/common/form-group-from";
import { AddressForm } from "@presenter/models/pages/register/address-form";
import { BasicInformationForm } from "@presenter/models/pages/register/basic-information-form";
import { PersonalInformationForm } from "@presenter/models/pages/register/personal-information-form";
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
    private readonly loginUsecase: LoginUsecase,
    private readonly registerUsecase: RegisterUsecase,
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

  public async nextStep(): Promise<void> {
    if (this.step === RegisterStep.ADDRESS) {
      const {
        address,
        basicInformation,
        personalInformation,
      } = this.form.getRawValue()

      return void await this.registerUsecase.call({
        ...address as AddressForm,
        ...basicInformation as BasicInformationForm,
        ...personalInformation as PersonalInformationForm,
        birthDate: new Date((personalInformation as PersonalInformationForm).birthDate),
       });
    }


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
