import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastr = jasmine.createSpyObj('ToastrService', ['error'])
    service = new ToastService(toastr);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
