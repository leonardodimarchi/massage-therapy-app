import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BadRequestError } from "@domain/errors";
import { ValidationError } from "@domain/errors/validation_error";
import { UserGenderEnum } from "@domain/models/user/user_gender.enum";
import { LoginUsecase } from "@domain/usecases/user/login_usecase";
import { RegisterUsecase } from "@domain/usecases/user/register_usecase";
import { BackButtonService } from "@infra/modules/back-button/services/back-button.service";
import { RouterServiceInterface } from "@infra/modules/router/contracts/router-service.interface";
import { ToastServiceInterface } from "@infra/modules/toast/contracts/toast-service.interface";
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
export class RegisterComponent implements OnDestroy {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginUsecase: LoginUsecase,
    private readonly registerUsecase: RegisterUsecase,
    private readonly toastService: ToastServiceInterface,
    private readonly routerService: RouterServiceInterface,
    private readonly backButtonService: BackButtonService,
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

  public ngOnDestroy(): void {
    RegisterStepHelper.toList().forEach(step => {
      this.backButtonService.removeAction(`register-return-step-to-${step}`);
    })
  }

  public returnStep(): void {
    const previousStep = RegisterStepHelper.getPrevious(this.step);

    this.backButtonService.removeAction(`register-return-step-to-${previousStep}`);

    this.step = previousStep
  }

  public async nextStep(): Promise<void> {
    if (this.isLoading)
      return;

    try {
      this.isLoading = true;

      if (this.step === RegisterStep.ADDRESS)
        return await this.register();

      this.backButtonService.addAction({
        key: `register-return-step-to-${this.step}`,
        action: this.returnStep.bind(this),
      });

      this.step = RegisterStepHelper.getNext(this.step);
    } catch (error) {
      const isWarning = error instanceof ValidationError || error instanceof BadRequestError;

      if (isWarning)
        return this.toastService.showWarning({ message: error.message });

      this.toastService.showError({ message: (error as any).message });
    } finally {
      this.isLoading = false;
    }
  }

  private async register(): Promise<void> {
    const {
      address,
      basicInformation,
      personalInformation,
    } = this.form.getRawValue()

    await this.registerUsecase.call({
      address: {
        ...address as AddressForm,
        houseNumber: +(address as AddressForm).houseNumber,
      },
      ...basicInformation as BasicInformationForm,
      ...personalInformation as PersonalInformationForm,
      birthDate: new Date((personalInformation as PersonalInformationForm).birthDate),
    });

    await this.loginUsecase.call({
      email: (basicInformation as BasicInformationForm).email,
      password: (basicInformation as BasicInformationForm).password,
    });

    this.toastService.showSuccess({
      title: 'Sucesso!',
      message: 'Sua conta foi cadastrada =)'
    });

    return await this.routerService.navigate('/login');
  }

  private createForm(): FormGroupFrom<RegisterForm> {
    return this.formBuilder.nonNullable.group({
      basicInformation: this.formBuilder.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, FormValidators.name]],
        phone: ['', [Validators.required, FormValidators.phone]],
        password: ['', [Validators.required, FormValidators.password]],
        passwordConfirmation: ['', [Validators.required, FormValidators.password]],
      }, {
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
        houseNumber: [undefined, [Validators.required, Validators.min(1)]],
      })
    });
  }
}
