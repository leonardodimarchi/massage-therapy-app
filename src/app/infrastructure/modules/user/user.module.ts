import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceInterface } from 'src/app/domain/contracts/services/user_service.interface';
import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { 
      provide: UserServiceInterface, 
      useFactory: (storageService: StorageServiceInterface) => {
        return new UserService(storageService);
      },
      deps: [StorageServiceInterface],
    },
  ]
})
export class UserModule { }
