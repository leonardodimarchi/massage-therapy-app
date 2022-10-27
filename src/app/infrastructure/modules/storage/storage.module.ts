import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StorageServiceInterface } from "@domain/contracts/services";
import { StorageService } from "@infra/modules/storage/services/storage.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: StorageServiceInterface, useClass: StorageService },
  ]
})
export class StorageModule {}
