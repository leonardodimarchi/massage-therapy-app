import { BadRequestError } from '@domain/errors';
import { ToastServiceInterface } from "@infra/modules/toast/contracts/toast-service.interface";
import { Component } from "@angular/core";
import { FormBuilder } from '@angular/forms';
import { ValidationError } from '@domain/errors/validation_error';
import { LoginUsecase } from '@domain/usecases/user/login_usecase';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';
import { FormGroupFrom } from '@presenter/models/common/form-group-from';
import { LoginForm } from '@presenter/models/pages/login/login-form';

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
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.nonNullable.group({
      email: [''],
      password: [''],
    });
  }

  public form: FormGroupFrom<LoginForm>;

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
