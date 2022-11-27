import { AppointmentsComponent } from "./appointments.component";

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;

  beforeEach(async () => {
    component = new AppointmentsComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
