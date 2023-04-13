import { RouteAnimationParams } from './models/router/route-animation-params.interface';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserServiceInterface } from '@domain/contracts/services/user_service.interface';
import { sliderRouteAnimation } from './animations/route/slider.animation';
import { BackButtonService } from '@infra/modules/back-button/services/back-button.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sliderRouteAnimation,
  ]
})
export class AppComponent {

  constructor(
    private readonly userService: UserServiceInterface,
    private readonly backButtonService: BackButtonService,
  ) {
    this.setupLoggedUserIfNeeded();
    this.backButtonService.initialize();
  }

  private async setupLoggedUserIfNeeded(): Promise<void> {
    const isLogged = await this.userService.isLogged();

    if (isLogged)
      await this.userService.setUpLoggedUser();
  }

  public prepareRouteAnimations(outlet: RouterOutlet): string | undefined {
    return outlet &&
      outlet.activatedRouteData &&
      (outlet.activatedRouteData as RouteAnimationParams).animation;
  }
}
