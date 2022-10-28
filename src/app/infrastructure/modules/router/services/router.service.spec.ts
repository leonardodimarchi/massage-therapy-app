import { Router } from '@angular/router';

import { RouterService } from '@infra/modules/router/services/router.service';

describe('RouterService', () => {
  let service: RouterService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    service = new RouterService(router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('navigate', () => {
    it('should call navigateByUrl', async () => {
      const path = '/something';

      await service.navigate(path);

      expect(router.navigateByUrl).toHaveBeenCalledOnceWith(path);
    });
  });
});
