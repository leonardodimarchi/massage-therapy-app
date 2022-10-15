import { StorageService } from './services/storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [StorageService]
})
export class StorageModule { }
