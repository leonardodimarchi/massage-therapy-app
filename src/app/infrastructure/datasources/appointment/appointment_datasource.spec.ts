import { ApiEndpoints } from './../endpoints';
import { AppointmentDatasource } from './appointment_datasource';
import { AppointmentDatasourceInterface } from "@infra/contracts/datasources";
import { HttpServiceInterface } from '@domain/contracts/services';

describe('AppointmentDatasource', () => {
    let datasource: AppointmentDatasourceInterface;
    let httpService: jasmine.SpyObj<HttpServiceInterface>;

    beforeEach(() => {
      httpService = jasmine.createSpyObj('HttpServiceInterface', ['get']);
      datasource = new AppointmentDatasource(httpService);
    });

    it('should initialize', () => {
      expect(datasource).toBeDefined();
    });

    describe('GetUserAppointments', () => {
      it('should call HTTP GET with the correct url and payload', async () => {
        const page = 1;
        const limit = 5;
        const url = ApiEndpoints.Appointment.getUserAppointments(page, limit);

        await datasource.getUserAppointments({
          page,
          limit,
        });

        expect(httpService.get).toHaveBeenCalledOnceWith(url);
      });
    })
});
