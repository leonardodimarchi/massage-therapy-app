import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';
import { BackButtonComponent } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;

  let routerService: jasmine.SpyObj<RouterServiceInterface>;

  beforeEach(async () => {
    routerService = jasmine.createSpyObj('RouterServiceInterface', ['goBack']);
    component = new BackButtonComponent(routerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('GoBack', () => {
    it('should call router service goBack method', async () => {
      await component.goBack();

      expect(routerService.goBack).toHaveBeenCalledTimes(1);
    });
  });
});
