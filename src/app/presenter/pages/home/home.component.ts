import { UserEntity } from '@domain/entities/user/user_entity';
import { UserServiceInterface } from '@domain/contracts/services';
import { Component } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private readonly userService: UserServiceInterface,
  ) {
    this.userService.subscribeLoggedUserForChanges(this.userListener.bind(this));
  }

  public currentUser: UserEntity | null = null;

  private userListener(user: UserEntity | null): void {
    this.currentUser = user;
  }
}
