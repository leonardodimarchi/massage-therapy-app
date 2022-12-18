import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';
import { RouterService } from '@infra/modules/router/services/router.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BackButtonComponent,
  ],
  exports: [
    BackButtonComponent,
  ],
  providers: [
    {
      provide: RouterServiceInterface,
      useClass: RouterService,
    }
  ]
})
export class BackButtonModule { }
