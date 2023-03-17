import { Component, Input } from '@angular/core';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private readonly routerService: RouterServiceInterface,
  ) {}

  @Input()
  public title: string = '';

  public async goBack(): Promise<void> {
    await this.routerService.goBack();
  }
}
