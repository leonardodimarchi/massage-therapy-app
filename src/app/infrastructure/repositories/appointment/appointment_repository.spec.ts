import { HttpErrorHandler } from './../shared/errors/http_error_handler';
import { GetUserAppointmentsParams } from './../../../domain/contracts/repositories/appointment_repository.interface';
import { AppointmentDatasourceInterface } from './../../contracts/datasources/appointment_datasource.interface';
import { AppointmentRepository } from "./appointment_repository";

describe('AppointmentRepository', () => {
  let datasource: jasmine.SpyObj<AppointmentDatasourceInterface>;
  let repository: AppointmentRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('AppointmentDatasource', ['getUserAppointments']);
    repository = new AppointmentRepository(datasource);
  });

  it('should call the datasource with the correct params', async () => {
    const params: GetUserAppointmentsParams = {
      limit: 5,
      page: 1,
    }

    await repository.getUserAppointments(params);

    expect(datasource.getUserAppointments).toHaveBeenCalledOnceWith(params);
  });

  it('should call the error handler', async () => {
    const error = new Error('mocked');
    const errorHandlerSpy = spyOn(HttpErrorHandler, 'handle');

    datasource.getUserAppointments.and.throwError(error);

    await repository.getUserAppointments({
      limit: 5,
      page: 1,
    });

    expect(errorHandlerSpy).toHaveBeenCalledOnceWith(error);
  })
});
