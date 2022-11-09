import { BadRequestError } from '@domain/errors';
import { ToastServiceInterface } from "@infra/modules/toast/contracts/toast-service.interface";
import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { LoginUsecase } from "@domain/usecases/user/login_usecase";
import { RouterServiceInterface } from "@infra/modules/router/contracts/router-service.interface";
import { ValidationError } from '@domain/errors/validation_error';

interface LoginPayloadForm {
  email: FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly toastService: ToastServiceInterface,
    private readonly routerService: RouterServiceInterface,
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  public form: FormGroup<LoginPayloadForm>;

  public isShowingPassword: boolean = false;

  public isLoading: boolean = false;

  public async login(): Promise<void> {
    if (this.isLoading)
      return;

    this.isLoading = true;

    const {
      email,
      password,
    } = this.form.getRawValue();

    try {
      await this.loginUsecase.call({
        email,
        password,
      });

      await this.routerService.navigate('home');
    } catch (error: unknown) {
      const isBadRequestError = error instanceof BadRequestError;
      const isValidationError = error instanceof ValidationError;

      if (isBadRequestError || isValidationError) {
        return this.toastService.showWarning({
          message: error.message,
        });
      }

      if (error instanceof Error) {
        this.toastService.showError({
          message: error.message,
        });
      }
    } finally {
      this.isLoading = false;
    }
  }
}
