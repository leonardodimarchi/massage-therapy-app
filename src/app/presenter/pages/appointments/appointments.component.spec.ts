import { mockedAppointmentEntity } from './../../../../test/mocks/appointment/entities/appointment_entity_mock';
import { AppointmentEntity } from './../../../domain/entities/appointment/appointment_entity';
import { PaginatedItemsEntity } from "@domain/entities/shared/paginated_items_entity";
import { GetUserAppointmentsUsecase } from "@domain/usecases/appointment/get_user_appointments_usecase";
import { AppointmentsComponent } from "./appointments.component";
import { ToastServiceInterface } from '@infra/modules/toast/contracts/toast-service.interface';

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;

  let getUserAppointmentsUsecase: jasmine.SpyObj<GetUserAppointmentsUsecase>;
  let toastService: jasmine.SpyObj<ToastServiceInterface>;

  beforeEach(async () => {
    getUserAppointmentsUsecase = jasmine.createSpyObj('GetUserAppointmentsUsecase', ['call']);
    toastService = jasmine.createSpyObj('ToastServiceInterface', ['showError']);
    component = new AppointmentsComponent(getUserAppointmentsUsecase, toastService);
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

    it('should set the loading as true while getting the appointments', async () => {
      component.appointments = mockedInitialPaginatedAppointments;
      component.itemsPerPage = 5;

      component.loadAppointments();

      expect(component.isLoading).toBeTrue();
    });

    it('should set the loading as false after getting the appointments', async () => {
      component.appointments = mockedInitialPaginatedAppointments;
      component.itemsPerPage = 5;

      await component.loadAppointments();

      expect(component.isLoading).toBeFalse();
    });

    it('should set the loading as false even if the usecase throws and error', async () => {
      component.appointments = mockedInitialPaginatedAppointments;
      component.itemsPerPage = 5;

      getUserAppointmentsUsecase.call.and.throwError('mocked error');

      await component.loadAppointments();

      expect(component.isLoading).toBeFalse();
    });

    it('should show a toast error if the usecase throws any', async () => {
      component.appointments = mockedInitialPaginatedAppointments;
      component.itemsPerPage = 5;

      getUserAppointmentsUsecase.call.and.throwError('mocked error');

      await component.loadAppointments();

      expect(toastService.showError).toHaveBeenCalledOnceWith({ message: 'mocked error' });
    });

    it('should append the new items to the current item list', async () => {
      component.appointments = new PaginatedItemsEntity<AppointmentEntity>({
        count: 0,
        items: [mockedAppointmentEntity, mockedAppointmentEntity],
        page: 0,
        pageCount: 1,
        total: 0,
      });
      component.itemsPerPage = 5;

      getUserAppointmentsUsecase.call.and.resolveTo(new PaginatedItemsEntity<AppointmentEntity>({
        count: 5,
        items: [
          mockedAppointmentEntity,
          mockedAppointmentEntity,
          mockedAppointmentEntity,
          mockedAppointmentEntity,
          mockedAppointmentEntity,
        ],
        page: 2,
        pageCount: 3,
        total: 8,
      }));

      await component.loadAppointments();

      expect(component.appointments.items.length).toBe(7);
    });
  });
});
