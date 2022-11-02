import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(async () => {
    component = new HomeComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
