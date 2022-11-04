import { LogoutUsecase } from '@domain/usecases/user/logout_usecase';
import { UserEntity } from '@domain/entities/user/user_entity';
import { UserServiceInterface } from '@domain/contracts/services';
import { Component } from "@angular/core";
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly routerService: RouterServiceInterface,
    private readonly logoutUsecase: LogoutUsecase,
  ) {
    this.userService.subscribeLoggedUserForChanges(this.userListener.bind(this));
  }

  public currentUser: UserEntity | null = null;

  public async logout(): Promise<void> {
    await this.logoutUsecase.call();
    await this.routerService.navigate('login');
  }

  private userListener(user: UserEntity | null): void {
    this.currentUser = user;
  }
}
