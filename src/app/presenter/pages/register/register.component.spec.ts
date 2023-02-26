import { FormBuilder } from '@angular/forms';
import { RegisterComponent } from "./register.component";

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  let formBuilder: FormBuilder;

  beforeEach(async () => {
    formBuilder = new FormBuilder();

    component = new RegisterComponent(formBuilder);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
