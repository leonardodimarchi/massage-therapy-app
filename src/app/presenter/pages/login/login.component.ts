import { Component } from '@angular/core';
import { LoginUsecase } from 'src/app/domain/usecases/user/login_usecase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private readonly loginUsecase: LoginUsecase,
  ) {}

  public isShowingPassword: boolean = false;

}
