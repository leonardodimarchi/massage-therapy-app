import { ToastrService } from 'ngx-toastr';
import { ToastService } from '@infra/modules/toast/services/toast.service';

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
