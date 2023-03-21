import { ToastrService } from 'ngx-toastr';
import { ToastService } from '@infra/modules/toast/services/toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastr = jasmine.createSpyObj('ToastrService', ['error', 'warning', 'success'])
    service = new ToastService(toastr);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Error', () => {
    it('should call error toast', () => {
      service.showError({ message: 'error' });

      expect(toastr.error).toHaveBeenCalledTimes(1);
    });
  });

  describe('Warning', () => {
    it('should call warning toast', () => {
      service.showWarning({ message: 'warning' });

      expect(toastr.warning).toHaveBeenCalledTimes(1);
    });
  });

  describe('Success', () => {
    it('should call success toast', () => {
      service.showSuccess({ message: 'success' });

      expect(toastr.success).toHaveBeenCalledTimes(1);
    });
  });
});
