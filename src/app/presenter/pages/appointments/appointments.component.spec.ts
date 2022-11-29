import { GetUserAppointmentsUsecase } from "@domain/usecases/appointment/get_user_appointments_usecase";
import { AppointmentsComponent } from "./appointments.component";

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;

  let getUserAppointmentsUsecase: jasmine.SpyObj<GetUserAppointmentsUsecase>;

  beforeEach(async () => {
    getUserAppointmentsUsecase = jasmine.createSpyObj('GetUserAppointmentsUsecase', ['login']);
    component = new AppointmentsComponent(getUserAppointmentsUsecase);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
