import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterServiceInterface } from "./contracts/router-service.interface";
import { RouterService } from "./services/router.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: RouterServiceInterface, useClass: RouterService },
  ]
})
export class StorageModule {}
