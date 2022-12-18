import { Component } from '@angular/core';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  constructor(
    private readonly routerService: RouterServiceInterface,
  ) {}

  public async goBack(): Promise<void> {
    await this.routerService.goBack();
  }
}
