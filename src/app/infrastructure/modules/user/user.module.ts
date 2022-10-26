import { StorageModule } from './../storage/storage.module';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserServiceInterface } from 'src/app/domain/contracts/services/user_service.interface';
import { StorageServiceInterface } from 'src/app/domain/contracts/services/storage_service.interface';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    StorageModule,
  ],
})
export class UserModule {
  constructor(@Optional() @SkipSelf() parentModule?: UserModule) {
    if (parentModule) {
      throw new Error('UserModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [
        {
          provide: UserServiceInterface,
          useFactory: (storageService: StorageServiceInterface) => {
            return new UserService(storageService);
          },
          deps: [StorageServiceInterface],
        },
      ]
    };
  }
}
