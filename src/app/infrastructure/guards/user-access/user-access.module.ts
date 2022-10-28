import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterServiceInterface } from "@infra/modules/router/contracts/router-service.interface";
import { RouterService } from "@infra/modules/router/services/router.service";

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
