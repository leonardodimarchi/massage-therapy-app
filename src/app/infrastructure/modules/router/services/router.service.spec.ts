import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterService } from '@infra/modules/router/services/router.service';

describe('RouterService', () => {
  let service: RouterService;
  let router: jasmine.SpyObj<Router>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    location = jasmine.createSpyObj('Location', ['back']);
    service = new RouterService(router, location);
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

  describe('goBack', () => {
    it('should go to previous location', async () => {
      await service.goBack();

      expect(location.back).toHaveBeenCalledTimes(1);
    });
  });
});
