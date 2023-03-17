import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';
import { RouterService } from '@infra/modules/router/services/router.service';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    {
      provide: RouterServiceInterface,
      useClass: RouterService,
    }
  ]
})
export class HeaderModule { }
