import { ToastConfig } from '../contracts/toast-config.interface';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastServiceInterface } from '../contracts/toast-service.interface';

@Injectable()
export class ToastService implements ToastServiceInterface {

  constructor(
    private readonly toastr: ToastrService,
  ) { }

  public showError(config: ToastConfig): void {
    this.toastr.error(config.message, config.title ?? '', {
      positionClass: 'toast-bottom-center',
    });
  }
}
