import { PaginatedItemsEntity } from '@domain/entities/shared/paginated_items_entity';
import { AppointmentEntity } from '@domain/entities/appointment/appointment_entity';
import { mockedAppointmentEntity } from './../../../../test/mocks/appointment/entities/appointment_entity_mock';
import { AppointmentRepositoryInterface } from "@domain/contracts/repositories";
import { GetUserAppointmentsUsecase } from "./get_user_appointments_usecase";

describe('GetUserAppointmentsUsecase', () => {
  let usecase: GetUserAppointmentsUsecase;
  let repository: jasmine.SpyObj<AppointmentRepositoryInterface>;

  beforeEach(() => {
    repository = jasmine.createSpyObj('AppointmentRepositoryInterface', ['getUserAppointments'])
    usecase = new GetUserAppointmentsUsecase(repository);
  });

  it('should instantiate the usecase', () => {
    expect(usecase).toBeDefined();
  });

  it('should call the repository and return its result', async () => {
    const paginatedItems: PaginatedItemsEntity<AppointmentEntity> = new PaginatedItemsEntity({
      page: 1,
      pageCount: 1,
      total: 1,
      count: 1,
      items: [mockedAppointmentEntity],
    });

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
