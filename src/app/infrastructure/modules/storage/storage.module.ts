import { StorageServiceInterface } from './models/storage-service-interface';
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
export class StorageModule { }
