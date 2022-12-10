import { AppointmentEntity } from './../../../domain/entities/appointment/appointment_entity';
import { PaginatedItemsEntity } from "@domain/entities/shared/paginated_items_entity";
import { GetUserAppointmentsUsecase } from "@domain/usecases/appointment/get_user_appointments_usecase";
import { AppointmentsComponent } from "./appointments.component";

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;

  let getUserAppointmentsUsecase: jasmine.SpyObj<GetUserAppointmentsUsecase>;

  beforeEach(async () => {
    getUserAppointmentsUsecase = jasmine.createSpyObj('GetUserAppointmentsUsecase', ['call']);
    component = new AppointmentsComponent(getUserAppointmentsUsecase);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('LoadAppointments', () => {
    const mockedPaginatedAppointments: PaginatedItemsEntity<AppointmentEntity> = new PaginatedItemsEntity<AppointmentEntity>({
      count: 5,
      items: [],
      page: 2,
      pageCount: 3,
      total: 8,
    });

    const mockedInitialPaginatedAppointments: PaginatedItemsEntity<AppointmentEntity> = new PaginatedItemsEntity<AppointmentEntity>({
      count: 0,
      items: [],
      page: 0,
      pageCount: 1,
      total: 0,
    });

    it('should call the usecase and set the result', async () => {
      component.appointments = mockedInitialPaginatedAppointments;
      getUserAppointmentsUsecase.call.and.resolveTo(mockedPaginatedAppointments);

      await component.loadAppointments();

      expect(getUserAppointmentsUsecase.call).toHaveBeenCalledTimes(1);
      expect(component.appointments).toEqual(mockedPaginatedAppointments);
    });

    it('should send the specified limit and page = 1 if the current page is 1', async () => {
      const itemsPerPage = 6;
      const currentPage = 1;

      component.appointments = new PaginatedItemsEntity<AppointmentEntity>({
        count: 0,
        page: currentPage,
        pageCount: 2,
        total: 0,
        items: [],
      });
      component.itemsPerPage = itemsPerPage;

      await component.loadAppointments();

      expect(getUserAppointmentsUsecase.call).toHaveBeenCalledOnceWith({
        limit: itemsPerPage,
        page: currentPage + 1,
      });
    });

    it('should send the specified limit and page as 3 if the current page is 2', async () => {
      const itemsPerPage = 8;
      const currentPage = 2;

      component.appointments = new PaginatedItemsEntity<AppointmentEntity>({
        count: 0,
        page: currentPage,
        pageCount: 3,
        total: 0,
        items: [],
      });
      component.itemsPerPage = itemsPerPage;

      await component.loadAppointments();

      expect(getUserAppointmentsUsecase.call).toHaveBeenCalledOnceWith({
        limit: itemsPerPage,
        page: currentPage + 1,
      });
    });

    it('should not call if the current page is 1 and the maximum page count is 1 too', async () => {
      const itemsPerPage = 8;
      const currentPage = 1;

      component.appointments = new PaginatedItemsEntity<AppointmentEntity>({
        count: 0,
        page: currentPage,
        pageCount: 1,
        total: 0,
        items: [],
      });
      component.itemsPerPage = itemsPerPage;

      await component.loadAppointments();

      expect(getUserAppointmentsUsecase.call).not.toHaveBeenCalled();
    });

    it('should not call if the current page is 2 and the maximum page count is 2 too', async () => {
      const itemsPerPage = 8;
      const currentPage = 2;

      component.appointments = new PaginatedItemsEntity<AppointmentEntity>({
        count: 0,
        page: currentPage,
        pageCount: 2,
        total: 0,
        items: [],
      });
      component.itemsPerPage = itemsPerPage;

      await component.loadAppointments();

      expect(getUserAppointmentsUsecase.call).not.toHaveBeenCalled();
    });
  });
});
