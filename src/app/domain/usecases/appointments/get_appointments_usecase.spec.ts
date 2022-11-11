import { GetAppointmentsUsecase } from "./get_appointments_usecase";

describe('GetAppointmentsUsecase', () => {
  let usecase: GetAppointmentsUsecase;

  beforeEach(() => {
    usecase = new GetAppointmentsUsecase();
  });

  it('should instantiate the usecase', () => {
    expect(usecase).toBeDefined();
  })
});
