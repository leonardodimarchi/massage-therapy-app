import { RouterServiceInterface } from '@infra/modules/router/contracts/router-service.interface';
import { HeaderComponent } from './header.component';

describe('Header', () => {
  let component: HeaderComponent;

  let routerService: jasmine.SpyObj<RouterServiceInterface>;

  beforeEach(async () => {
    routerService = jasmine.createSpyObj('RouterServiceInterface', ['goBack']);
    component = new HeaderComponent(routerService);
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
