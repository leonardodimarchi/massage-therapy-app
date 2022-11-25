import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { HttpErrorHandler } from './../shared/errors/http_error_handler';
import { GetUserAppointmentsParams } from './../../../domain/contracts/repositories/appointment_repository.interface';
import { AppointmentDatasourceInterface } from './../../contracts/datasources/appointment_datasource.interface';
import { AppointmentRepository } from "./appointment_repository";
import { PaginatedItemsDto } from '@infra/models/shared/dto/paginated_items_dto';
import { AppointmentDto } from '@infra/models/appointment/dto/appointment_dto';
import { mockedAppointmentDto } from '@mocks/appointment/dto/appointment_dto_mock';
import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { mockedAppointmentEntity } from '@mocks/appointment/entities/appointment_entity_mock';

describe('AppointmentRepository', () => {
  let datasource: jasmine.SpyObj<AppointmentDatasourceInterface>;
  let repository: AppointmentRepository;

  beforeEach(() => {
    datasource = jasmine.createSpyObj('AppointmentDatasource', ['getUserAppointments']);
    repository = new AppointmentRepository(datasource);
  });

  it('should call the datasource with the correct params', async () => {
    const datasourceReturnValue: PaginatedItemsDto<AppointmentDto> = {
      count: 1,
      page: 1,
      pageCount: 1,
      total: 1,
      items: [mockedAppointmentDto],
    };
    datasource.getUserAppointments.and.resolveTo(datasourceReturnValue);

    const params: GetUserAppointmentsParams = {
      limit: 5,
      page: 1,
    }

    await repository.getUserAppointments(params);

    expect(datasource.getUserAppointments).toHaveBeenCalledOnceWith(params);
  });

  it('should map the result and return the entities', async () => {
    const datasourceReturnValue: PaginatedItemsDto<AppointmentDto> = {
      count: 1,
      page: 1,
      pageCount: 1,
      total: 1,
      items: [mockedAppointmentDto],
    };
    datasource.getUserAppointments.and.resolveTo(datasourceReturnValue);

    const params: GetUserAppointmentsParams = {
      limit: 5,
      page: 1,
    }

    const result = await repository.getUserAppointments(params);

    expect(result).toBeInstanceOf(PaginatedItemsEntity<AppointmentEntity>);
    expect(result.count).toBe(1);
    expect(result.pageCount).toBe(1);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.items[0]).toBeInstanceOf(AppointmentEntity);
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
