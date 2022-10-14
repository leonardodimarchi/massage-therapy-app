import { ToastService } from './../../../infrastructure/modules/toast/services/toast.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginUsecase } from 'src/app/domain/usecases/user/login_usecase';

interface LoginPayloadForm {
  email: FormControl<string>,
  password: FormControl<string>,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly toastService: ToastService,
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
    } catch (error: any) {
      this.toastService.showError({
        message: error.message,
      })
    } finally {
      this.isLoading = false;
    }
  }
}
