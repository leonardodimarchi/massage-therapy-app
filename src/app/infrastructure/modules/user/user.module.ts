import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import { UserServiceInterface, StorageServiceInterface } from "@domain/contracts/services";
import { StorageModule } from "@infra/modules/storage/storage.module";
import { UserService } from "@infra/modules/user/services/user.service";

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
