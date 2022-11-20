import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { PaginatedItems } from '@domain/models/interfaces/paginated-items.interface';
import { mockedAppointmentEntity } from './../../../../test/mocks/appointment/entities/appointment_entity_mock';
import { AppointmentRepository } from "@domain/contracts/repositories";
import { GetUserAppointmentsUsecase } from "./get_user_appointments_usecase";

describe('GetUserAppointmentsUsecase', () => {
  let usecase: GetUserAppointmentsUsecase;
  let repository: jasmine.SpyObj<AppointmentRepository>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('AppointmentRepository', ['getUserAppointments'])
    usecase = new GetUserAppointmentsUsecase(repository);
  });

  it('should instantiate the usecase', () => {
    expect(usecase).toBeDefined();
  });

  it('should call the repository and return its result', async () => {
    const paginatedItems: PaginatedItems<AppointmentEntity> = {
      page: 1,
      pageCount: 1,
      total: 1,
      count: 1,
      items: [mockedAppointmentEntity],
    };

    repository.getUserAppointments.and.resolveTo(paginatedItems)

    const result = await usecase.call({
      page: 1,
      limit: 8,
    });

    expect(repository.getUserAppointments).toHaveBeenCalledOnceWith({
      page: 1,
      limit: 8,
    });
    expect(result).toEqual(paginatedItems);
  });
});
