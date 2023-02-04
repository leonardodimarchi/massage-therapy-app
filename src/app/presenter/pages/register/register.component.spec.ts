import { RegisterComponent } from "./register.component";

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  beforeEach(async () => {

    component = new RegisterComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
