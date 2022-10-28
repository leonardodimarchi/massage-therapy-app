import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from "@angular/core";
import { ToastrModule } from "ngx-toastr";
import { ToastServiceInterface } from "@infra/modules/toast/contracts/toast-service.interface";
import { ToastService } from "@infra/modules/toast/services/toast.service";

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
