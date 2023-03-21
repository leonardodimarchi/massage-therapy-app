import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastConfig } from '@infra/modules/toast/contracts/toast-config.interface';
import { ToastServiceInterface } from '@infra/modules/toast/contracts/toast-service.interface';

@Injectable()
export class ToastService implements ToastServiceInterface {

  constructor(
    private readonly toastr: ToastrService,
  ) { }

  public showError(config: ToastConfig): void {
    this.toastr.error(config.message, config.title, {
      positionClass: 'toast-bottom-center',
    });
  }

  public showWarning(config: ToastConfig): void {
    this.toastr.warning(config.message, config.title, {
      positionClass: 'toast-bottom-center',
    });
  }

  public showSuccess(config: ToastConfig): void {
    this.toastr.success(config.message, config.title, {
      positionClass: 'toast-bottom-center',
    });
  }
}
