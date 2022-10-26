import { RouterService } from './../../modules/router/services/router.service';
import { UserAccessGuard } from './user-access.guard';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterServiceInterface } from '../../modules/router/contracts/router-service.interface';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: RouterServiceInterface,
      useClass: RouterService,
    }
  ]
})
export class UserAccessModule {}
