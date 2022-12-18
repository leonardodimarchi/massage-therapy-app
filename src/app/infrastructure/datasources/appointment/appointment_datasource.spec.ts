import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { PaginatedItemsDto } from './../../models/shared/dto/paginated_items_dto';
import { ApiEndpoints } from './../endpoints';
import { AppointmentDatasource } from './appointment_datasource';
import { AppointmentDatasourceInterface } from "@infra/contracts/datasources";
import { HttpServiceInterface } from '@domain/contracts/services';
import { AppointmentDto } from '@infra/models/appointment/dto/appointment_dto';

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
        const fetchResult: PaginatedItemsDto<AppointmentDto> = {
          count: 1,
          page: 1,
          pageCount: 1,
          total: 1,
          items: [],
        };
        httpService.get.and.resolveTo(fetchResult);

        const page = 1;
        const limit = 5;
        const url = ApiEndpoints.Appointment.getUserAppointments(page, limit);

        await datasource.getUserAppointments({
          page,
          limit,
        });

        expect(httpService.get).toHaveBeenCalledOnceWith(url);
      });

      it('should return the DTO', async () => {
        const fetchResult: PaginatedItemsDto<AppointmentDto> = {
          count: 1,
          page: 1,
          pageCount: 1,
          total: 1,
          items: [],
        };
        httpService.get.and.resolveTo(fetchResult);

        const result = await datasource.getUserAppointments({
          page: 1,
          limit: 5,
        });

        expect(result).toEqual(fetchResult);
      });
    });
});
