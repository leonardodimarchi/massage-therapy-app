import { StorageServiceInterface } from '../../../domain/contracts/services/storage_service.interface';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: StorageServiceInterface, useClass: StorageService },
  ]
})
export class StorageModule {}
