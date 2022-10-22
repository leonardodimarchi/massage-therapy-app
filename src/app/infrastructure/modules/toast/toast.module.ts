import { ToastService } from './services/toast.service';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ToastServiceInterface } from './contracts/toast-service.interface';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
  ],
})
export class ToastModule { 
  constructor(@Optional() @SkipSelf() parentModule?: ToastModule) {
    if (parentModule) {
      throw new Error('ToastModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        { provide: ToastServiceInterface, useClass: ToastService },
      ]
    };
  }
}
