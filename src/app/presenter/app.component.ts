import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserServiceInterface } from '@domain/contracts/services/user_service.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly userService: UserServiceInterface,
  ) {
    this.setupLoggedUserIfNeeded();
  }

  private async setupLoggedUserIfNeeded(): Promise<void> {
    const isLogged = await this.userService.isLogged();

    if (isLogged)
      await this.userService.setUpLoggedUser();
  }

  public prepareRouteAnimations(outlet: RouterOutlet): string | false {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
