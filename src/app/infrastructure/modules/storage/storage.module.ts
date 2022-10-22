import { StorageServiceInterface } from '../../../domain/contracts/services/storage_service.interface';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    CommonModule,
  ],
})
export class StorageModule {
  constructor(@Optional() @SkipSelf() parentModule?: StorageModule) {
    if (parentModule) {
      throw new Error('StorageModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<StorageModule> {
    return {
      ngModule: StorageModule,
      providers: [
        { provide: StorageServiceInterface, useClass: StorageService },
      ]
    };
  }
}
